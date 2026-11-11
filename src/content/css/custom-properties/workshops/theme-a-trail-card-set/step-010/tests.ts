import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".app",
    "property": "--bg",
    "expected": [
      "#0f172a",
      " #0f172a"
    ],
    "message": "The dark theme sets `--bg`"
  },
  {
    "type": "computedStyle",
    "selector": ".app",
    "property": "--surface",
    "expected": [
      "#1e293b",
      " #1e293b"
    ],
    "message": "...`--surface`"
  },
  {
    "type": "computedStyle",
    "selector": ".app",
    "property": "--text",
    "expected": [
      "#e2e8f0",
      " #e2e8f0"
    ],
    "message": "...and `--text`."
  }
];

export default checks;
