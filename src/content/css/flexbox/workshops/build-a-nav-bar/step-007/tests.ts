import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "flex-shrink",
    "expected": "0",
    "message": "The button never shrinks (`flex-shrink: 0`)."
  }
];

export default checks;
