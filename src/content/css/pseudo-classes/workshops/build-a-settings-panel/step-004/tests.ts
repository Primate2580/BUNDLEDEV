import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "input:disabled + label",
    "property": "color",
    "expected": [
      "#94a3b8",
      "rgb(148, 163, 184)"
    ],
    "message": "The label of the disabled checkbox is grey."
  }
];

export default checks;
