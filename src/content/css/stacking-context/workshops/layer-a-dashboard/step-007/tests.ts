import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".back-top",
    "property": "position",
    "expected": [
      "fixed"
    ],
    "message": "The link is `position: fixed`"
  },
  {
    "type": "computedStyle",
    "selector": ".back-top",
    "property": "z-index",
    "expected": [
      "50"
    ],
    "message": "...at level `50`."
  }
];

export default checks;
