import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ":root",
    "property": "--surface",
    "expected": [
      "#ffffff",
      " #ffffff"
    ],
    "message": "`--surface` is defined"
  },
  {
    "type": "computedStyle",
    "selector": ".app",
    "property": "background-color",
    "expected": [
      "var(--bg)",
      "rgb(248, 250, 252)"
    ],
    "message": "...the page reads `--bg`"
  },
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "background-color",
    "expected": [
      "var(--surface)",
      "rgb(255, 255, 255)"
    ],
    "message": "...the card reads `--surface`"
  },
  {
    "type": "computedStyle",
    "selector": ".text",
    "property": "color",
    "expected": [
      "var(--muted)",
      "rgb(100, 116, 139)"
    ],
    "message": "...and the text reads `--muted`."
  }
];

export default checks;
