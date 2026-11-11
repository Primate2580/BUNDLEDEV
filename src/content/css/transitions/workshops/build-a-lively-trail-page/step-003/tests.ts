import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".nav-link",
    "property": "transition-timing-function",
    "expected": [
      "ease-out"
    ],
    "message": "The links use the `ease-out` curve.",
    "match": "all"
  }
];

export default checks;
