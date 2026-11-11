import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".ingredient",
    "property": "list-style-type",
    "expected": "square",
    "match": "all",
    "message": "Every ingredient has a square marker."
  }
];

export default checks;
