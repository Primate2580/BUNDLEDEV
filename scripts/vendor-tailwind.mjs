// Copies Tailwind's browser build into src/vendor so the preview can inline it.
// Run after upgrading @tailwindcss/browser:  npm run vendor:tailwind
import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("src/vendor", { recursive: true });
copyFileSync(
  "node_modules/@tailwindcss/browser/dist/index.global.js",
  "src/vendor/tailwind-browser.global.js",
);
console.log("Copied Tailwind browser build to src/vendor/tailwind-browser.global.js");
