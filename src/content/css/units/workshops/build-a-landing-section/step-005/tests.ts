import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "font-size",
    "expected": [
      "1rem",
      "16px"
    ],
    "message": "The button text is `1rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "padding-top",
    "expected": [
      "0.75em",
      "12px"
    ],
    "message": "...with `0.75em` of vertical padding"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "padding-left",
    "expected": [
      "1.5em",
      "24px"
    ],
    "message": "...and `1.5em` at the sides."
  }
];

export default checks;
