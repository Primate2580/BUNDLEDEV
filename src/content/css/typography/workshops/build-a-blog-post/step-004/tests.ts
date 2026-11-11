import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".post",
    "property": "max-width",
    "expected": [
      "65ch"
    ],
    "message": "The article column is at most `65ch` wide."
  }
];

export default checks;
