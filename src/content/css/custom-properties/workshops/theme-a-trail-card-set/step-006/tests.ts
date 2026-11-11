import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ":root",
    "property": "--space-4",
    "expected": [
      "calc(var(--space-3) * 2)",
      " calc(var(--space-3) * 2)",
      "calc(var(--space-3)*2)",
      " calc(var(--space-3)*2)"
    ],
    "message": "`--space-4` is built from `--space-3`"
  },
  {
    "type": "computedStyle",
    "selector": ".page",
    "property": "padding",
    "expected": [
      "var(--space-4) var(--space-3)",
      "32px 16px"
    ],
    "message": "...and the page uses it."
  }
];

export default checks;
