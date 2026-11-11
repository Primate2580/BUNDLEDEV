import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".nav",
    "property": "gap",
    "expected": "24px",
    "message": "There is a `24px` gap between the links."
  }
];

export default checks;
