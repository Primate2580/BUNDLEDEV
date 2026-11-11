import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".more",
    "property": "transition-duration",
    "expected": [
      "0.2s",
      "200ms"
    ],
    "message": "The buttons transition over `0.2s`",
    "match": "all"
  },
  {
    "type": "computedStyle",
    "selector": ".more",
    "property": "transition-timing-function",
    "expected": [
      "ease-out"
    ],
    "message": "...with `ease-out`.",
    "match": "all"
  }
];

export default checks;
