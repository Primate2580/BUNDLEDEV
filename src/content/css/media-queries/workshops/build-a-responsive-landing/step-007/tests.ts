import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".routes",
    "property": "max-width",
    "expected": [
      "72rem",
      "1152px"
    ],
    "message": "The routes are at most `72rem` wide."
  }
];

export default checks;
