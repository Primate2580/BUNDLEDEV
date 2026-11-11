import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".feature",
    "property": "min-width",
    "expected": [
      "14rem",
      "224px"
    ],
    "message": "Each card is at least `14rem` wide."
  }
];

export default checks;
