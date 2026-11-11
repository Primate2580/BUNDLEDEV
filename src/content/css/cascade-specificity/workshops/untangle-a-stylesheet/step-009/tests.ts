import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card--featured",
    "property": "border-top-width",
    "expected": [
      "2px"
    ],
    "message": "The featured card has a `2px` border"
  },
  {
    "type": "computedStyle",
    "selector": ".card--featured",
    "property": "border-top-color",
    "expected": [
      "#4f46e5",
      "rgb(79, 70, 229)"
    ],
    "message": "...in indigo."
  }
];

export default checks;
