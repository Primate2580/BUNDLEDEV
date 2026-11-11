import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "transition-property",
    "expected": [
      "transform, box-shadow",
      "box-shadow, transform"
    ],
    "message": "The cards transition `transform` and `box-shadow`.",
    "match": "all"
  }
];

export default checks;
