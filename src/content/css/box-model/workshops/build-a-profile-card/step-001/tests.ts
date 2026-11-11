import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "width",
    "expected": "320px",
    "message": "The card is `320px` wide."
  }
];

export default checks;
