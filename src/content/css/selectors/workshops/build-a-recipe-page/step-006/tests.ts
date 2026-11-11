import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".recipe > p",
    "property": "margin-bottom",
    "expected": "12px",
    "match": "all",
    "message": "Every direct paragraph of the recipe has a `12px` bottom margin."
  }
];

export default checks;
