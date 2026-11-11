import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".gallery",
    "property": "gap",
    "expected": "8px 16px",
    "message": "Rows are `8px` apart and columns are `16px` apart."
  }
];

export default checks;
