import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".plan-name",
    "property": "color",
    "expected": [
      "#4338ca",
      "rgb(67, 56, 202)"
    ],
    "message": "The plan name is `#4338ca`."
  },
  {
    "type": "computedStyle",
    "selector": ".price",
    "property": "color",
    "expected": [
      "#4338ca",
      "rgb(67, 56, 202)"
    ],
    "message": "...and so is the price."
  }
];

export default checks;
