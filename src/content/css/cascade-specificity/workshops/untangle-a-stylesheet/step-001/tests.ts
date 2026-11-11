import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "border-radius",
    "expected": [
      "1rem",
      "16px"
    ],
    "message": "The card has a `1rem` radius, from a single-class rule."
  }
];

export default checks;
