import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "display",
    "expected": [
      "inline-flex"
    ],
    "message": "The button is `inline-flex`"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "min-height",
    "expected": [
      "2.75rem",
      "44px"
    ],
    "message": "...at least `2.75rem` (44px) tall"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "padding-left",
    "expected": [
      "1.25rem",
      "20px"
    ],
    "message": "...with `1.25rem` at the sides."
  }
];

export default checks;
