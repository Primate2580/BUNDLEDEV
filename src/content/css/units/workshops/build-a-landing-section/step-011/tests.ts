import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".feature-title",
    "property": "margin-top",
    "expected": [
      "0.5rem",
      "8px"
    ],
    "message": "The card titles have `0.5rem` of top margin."
  }
];

export default checks;
