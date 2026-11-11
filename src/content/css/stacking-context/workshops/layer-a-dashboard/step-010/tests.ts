import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".toast",
    "property": "position",
    "expected": [
      "fixed"
    ],
    "message": "The toast is `position: fixed`"
  },
  {
    "type": "computedStyle",
    "selector": ".toast",
    "property": "z-index",
    "expected": [
      "400"
    ],
    "message": "...at level `400`."
  }
];

export default checks;
