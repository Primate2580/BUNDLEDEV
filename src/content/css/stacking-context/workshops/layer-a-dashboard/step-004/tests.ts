import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".tip",
    "property": "position",
    "expected": [
      "absolute"
    ],
    "message": "The labels are absolute"
  },
  {
    "type": "computedStyle",
    "selector": ".tip",
    "property": "z-index",
    "expected": [
      "2"
    ],
    "message": "...at level `2`, inside the card."
  }
];

export default checks;
