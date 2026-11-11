import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".feature",
    "property": "padding-top",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "The cards have `1.5rem` of padding."
  },
  {
    "type": "computedStyle",
    "selector": ".feature",
    "property": "border-radius",
    "expected": [
      "0.75rem",
      "12px"
    ],
    "message": "...and `0.75rem` corners."
  }
];

export default checks;
