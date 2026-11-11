import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "max-width",
    "expected": "100%",
    "message": "The card never grows wider than its container."
  }
];

export default checks;
