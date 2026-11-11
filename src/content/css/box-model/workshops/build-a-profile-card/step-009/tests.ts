import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".button",
    "property": "display",
    "expected": "inline-block",
    "message": "The button is `inline-block`."
  },
  {
    "type": "computedStyle",
    "selector": ".button",
    "property": "padding-top",
    "expected": "10px",
    "message": "It has `10px` of vertical padding."
  }
];

export default checks;
