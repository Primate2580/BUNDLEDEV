import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "letter-spacing",
    "expected": [
      "0.02em",
      "0.32px"
    ],
    "message": "The button text has `0.02em` of letter spacing."
  }
];

export default checks;
