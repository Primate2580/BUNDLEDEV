import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".field:required",
    "property": "border-color",
    "expected": [
      "#4f46e5",
      "rgb(79, 70, 229)"
    ],
    "message": "The required field has an indigo border."
  }
];

export default checks;
