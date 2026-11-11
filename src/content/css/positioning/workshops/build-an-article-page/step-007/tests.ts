import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".fab",
    "property": "position",
    "expected": [
      "fixed"
    ],
    "message": "The button is `position: fixed`"
  },
  {
    "type": "computedStyle",
    "selector": ".fab",
    "property": "bottom",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "...`1.5rem` from the bottom"
  },
  {
    "type": "computedStyle",
    "selector": ".fab",
    "property": "right",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "...and `1.5rem` from the right."
  }
];

export default checks;
