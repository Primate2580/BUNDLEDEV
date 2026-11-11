import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn-danger",
    "property": "background-color",
    "expected": [
      "#b91c1c",
      "rgb(185, 28, 28)"
    ],
    "message": "The danger button is `#b91c1c`, from `.btn-danger` alone."
  }
];

export default checks;
