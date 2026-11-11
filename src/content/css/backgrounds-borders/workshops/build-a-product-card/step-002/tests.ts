import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".product",
    "property": "border-radius",
    "expected": [
      "1rem",
      "16px"
    ],
    "message": "The card corners are `1rem`."
  }
];

export default checks;
