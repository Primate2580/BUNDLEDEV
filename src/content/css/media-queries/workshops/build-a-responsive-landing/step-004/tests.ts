import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".hero-title",
    "property": "margin-bottom",
    "expected": [
      "0.5rem",
      "8px"
    ],
    "message": "The title has `0.5rem` of space below"
  },
  {
    "type": "computedStyle",
    "selector": ".hero-title",
    "property": "font-weight",
    "expected": [
      "800"
    ],
    "message": "...and weight `800`."
  }
];

export default checks;
