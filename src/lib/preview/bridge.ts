import { runChecks } from "@/lib/checks/runChecks";
import { measureElements } from "./measure";

/**
 * Script injected into every preview document (it carries the CSP nonce, so it is
 * the only script besides Tailwind's that is allowed to run).
 * The glue is plain ES5 in a string: avoid backticks and dollar-braces. The one
 * interpolation is the check runner, copied in as source text (it is self-contained).
 */
export const BRIDGE_SOURCE = String.raw`
(function () {
  // Some build tools tag functions with a __name() helper. The copied runner must not depend on it.
  var __name = function (fn) { return fn; };
  var runChecks = (${runChecks.toString()});
  var measureElements = (${measureElements.toString()});
  var parentWin = window.parent;
  var meta = document.querySelector('meta[name="lab-doc"]');
  var docId = meta ? meta.getAttribute("content") : "";
  function send(msg) {
    msg.source = "csslab";
    msg.doc = docId;
    parentWin.postMessage(msg, "*");
  }
  function log(level, text) {
    send({ type: "log", level: level, text: text });
  }

  window.addEventListener("error", function (e) {
    log("error", String(e.message || "Error"));
  });
  window.addEventListener("unhandledrejection", function (e) {
    log("error", String((e.reason && e.reason.message) || e.reason || "Unhandled promise rejection"));
  });
  ["error", "warn"].forEach(function (level) {
    var original = console[level];
    console[level] = function () {
      try {
        log(level, Array.prototype.map.call(arguments, String).join(" "));
      } catch (_) {}
      return original.apply(console, arguments);
    };
  });

  // Scripts and other blocked resources: explain instead of failing silently.
  document.addEventListener("securitypolicyviolation", function (e) {
    var directive = e.effectiveDirective || e.violatedDirective || "";
    if (directive.indexOf("script-src") === 0) {
      log("warn", "Scripts are turned off in the preview. Only HTML and CSS run here.");
    } else if (directive.indexOf("form-action") === 0) {
      /* handled by the submit listener below */
    } else {
      log("warn", "Blocked by the preview's security rules (" + directive + "): " + (e.blockedURI || "inline"));
    }
  });

  // Keep the preview on its own page: no navigating away, no real form submits.
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!el) return;
    var href = el.getAttribute("href") || "";
    if (href.charAt(0) === "#") return; // in-page anchors are fine
    e.preventDefault();
    log("info", "Links to other pages are turned off in the preview: " + href);
  }, true);
  document.addEventListener("submit", function (e) {
    e.preventDefault();
    log("info", "Form submission is turned off in the preview. Validation still runs.");
  }, true);

  // Run the callback once the page has painted. Tailwind compiles a moment after its CSS changes.
  function afterSettle(callback) {
    var sheet = document.getElementById("lab-css");
    var wait = sheet && sheet.getAttribute("type") === "text/tailwindcss" ? 150 : 0;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        setTimeout(callback, wait);
      });
    });
  }

  // Live CSS updates without reloading the page (keeps scroll position).
  window.addEventListener("message", function (e) {
    if (e.source !== parentWin) return;
    var data = e.data;
    if (!data || data.target !== "csslab") return;
    if (data.type === "set-css") {
      var style = document.getElementById("lab-css");
      if (style) style.textContent = data.css;
    }
    if (data.type === "run-checks") {
      afterSettle(function () {
        var results;
        try {
          results = runChecks(data.checks, window);
        } catch (err) {
          results = data.checks.map(function () {
            return { passed: false, detail: "The checks couldn't run: " + (err && err.message) };
          });
        }
        send({ type: "check-results", id: data.id, results: results });
      });
    }
    if (data.type === "measure") {
      afterSettle(function () {
        var result;
        try {
          result = measureElements(data.requests, window);
        } catch (err) {
          result = { viewport: { width: 0, height: 0 }, elements: {} };
        }
        send({ type: "measure-result", id: data.id, result: result });
      });
    }
  });

  // "ready" = loaded and painted. Tailwind compiles right after load, so wait a beat.
  function settle() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        setTimeout(function () { send({ type: "ready" }); }, 80);
      });
    });
  }
  if (document.readyState === "complete") settle();
  else window.addEventListener("load", settle);
})();
`;
