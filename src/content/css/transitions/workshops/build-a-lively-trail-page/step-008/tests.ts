import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "transition-duration",
    "expected": [
      "0.3s",
      "300ms"
    ],
    "message": "The cards transition over `0.3s`",
    "match": "all"
  },
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "transition-timing-function",
    "expected": [
      "cubic-bezier(0.2, 0.8, 0.2, 1)"
    ],
    "message": "...with `cubic-bezier(0.2, 0.8, 0.2, 1)`.",
    "match": "all"
  }
];

export default checks;
