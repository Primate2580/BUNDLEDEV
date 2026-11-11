import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".route",
    "property": "padding-top",
    "expected": [
      "1.25rem",
      "20px"
    ],
    "message": "The cards have `1.25rem` of padding"
  },
  {
    "type": "computedStyle",
    "selector": ".route",
    "property": "border-radius",
    "expected": [
      "0.75rem",
      "12px"
    ],
    "message": "...and `0.75rem` corners."
  }
];

export default checks;
