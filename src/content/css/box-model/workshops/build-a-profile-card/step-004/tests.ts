import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "border-radius",
    "expected": "16px",
    "message": "The corners are rounded by `16px`."
  }
];

export default checks;
