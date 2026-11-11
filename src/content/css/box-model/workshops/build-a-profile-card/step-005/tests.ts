import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "margin-top",
    "expected": "32px",
    "message": "The card has a `32px` margin above it."
  }
];

export default checks;
