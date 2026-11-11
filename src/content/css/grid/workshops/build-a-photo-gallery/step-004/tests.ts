import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".gallery",
    "property": "grid-auto-rows",
    "expected": "120px",
    "message": "Every row is `120px` tall."
  }
];

export default checks;
