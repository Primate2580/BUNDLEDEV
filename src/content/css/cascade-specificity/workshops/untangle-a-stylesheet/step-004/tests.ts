import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn-primary",
    "property": "background-color",
    "expected": [
      "#4338ca",
      "rgb(67, 56, 202)"
    ],
    "message": "The primary button is `#4338ca`, from `.btn-primary` alone."
  }
];

export default checks;
