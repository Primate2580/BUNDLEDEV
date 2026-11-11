import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".product",
    "property": "overflow",
    "expected": [
      "hidden"
    ],
    "message": "The card clips its contents to its rounded corners."
  }
];

export default checks;
