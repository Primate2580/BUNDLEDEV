import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".routes",
    "property": "display",
    "expected": [
      "grid"
    ],
    "message": "The routes are a grid"
  },
  {
    "type": "computedStyle",
    "selector": ".routes",
    "property": "gap",
    "expected": [
      "1rem",
      "16px"
    ],
    "message": "...with a `1rem` gap"
  },
  {
    "type": "computedStyle",
    "selector": ".routes",
    "property": "padding-top",
    "expected": [
      "1rem",
      "16px"
    ],
    "message": "...and `1rem` of padding."
  }
];

export default checks;
