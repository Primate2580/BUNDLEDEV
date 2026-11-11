import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".nav",
    "property": "display",
    "expected": [
      "flex"
    ],
    "message": "The nav links are in a flex row"
  },
  {
    "type": "computedStyle",
    "selector": ".nav",
    "property": "gap",
    "expected": [
      "1rem",
      "16px"
    ],
    "message": "...`1rem` apart."
  }
];

export default checks;
