import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".nav-link",
    "property": "transition-property",
    "expected": [
      "color, text-decoration-color"
    ],
    "message": "The links transition `color, text-decoration-color`.",
    "match": "all"
  }
];

export default checks;
