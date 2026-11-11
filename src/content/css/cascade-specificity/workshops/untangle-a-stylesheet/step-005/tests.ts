import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn-large",
    "property": "padding-top",
    "expected": [
      "0.75rem",
      "12px"
    ],
    "message": "The large button has `0.75rem` of padding on top"
  },
  {
    "type": "computedStyle",
    "selector": ".btn-large",
    "property": "padding-left",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "...and `1.5rem` on the left."
  }
];

export default checks;
