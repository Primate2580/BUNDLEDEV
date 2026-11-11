import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".more",
    "property": "transition-property",
    "expected": [
      "background-color, transform",
      "transform, background-color"
    ],
    "message": "The buttons transition `background-color` and `transform`.",
    "match": "all"
  }
];

export default checks;
