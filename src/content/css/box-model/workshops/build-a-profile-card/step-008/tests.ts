import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".bio",
    "property": "margin-top",
    "expected": "16px",
    "message": "The bio has a `16px` margin above it."
  }
];

export default checks;
