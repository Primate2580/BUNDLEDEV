import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".featured",
    "property": "grid-column",
    "expected": "span 2",
    "message": "The featured tile spans two columns."
  }
];

export default checks;
