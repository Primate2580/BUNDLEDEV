import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "position",
    "expected": [
      "relative"
    ],
    "message": "The cards are positioned"
  },
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "z-index",
    "expected": [
      "1"
    ],
    "message": "...at level `1`."
  }
];

export default checks;
