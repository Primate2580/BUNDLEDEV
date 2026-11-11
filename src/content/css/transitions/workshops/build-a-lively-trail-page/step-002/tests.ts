import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".nav-link",
    "property": "transition-duration",
    "expected": [
      "0.2s",
      "200ms"
    ],
    "message": "The links transition over `0.2s`.",
    "match": "all"
  }
];

export default checks;
