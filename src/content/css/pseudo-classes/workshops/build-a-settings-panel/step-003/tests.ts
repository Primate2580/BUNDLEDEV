import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "input:checked + label",
    "property": "font-weight",
    "expected": [
      "700",
      "bold"
    ],
    "message": "The label of a ticked checkbox is bold."
  }
];

export default checks;
