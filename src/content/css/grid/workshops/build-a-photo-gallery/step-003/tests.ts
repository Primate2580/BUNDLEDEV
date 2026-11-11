import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".gallery",
    "property": "gap",
    "expected": "16px",
    "message": "There is a `16px` gap between tiles."
  }
];

export default checks;
