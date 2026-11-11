import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".nav-link",
    "property": "transition-property",
    "expected": [
      "color"
    ],
    "message": "The links transition the `color` property.",
    "match": "all"
  }
];

export default checks;
