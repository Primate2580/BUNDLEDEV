import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".featured",
    "property": "grid-row",
    "expected": "span 2",
    "message": "The featured tile spans two rows."
  }
];

export default checks;
