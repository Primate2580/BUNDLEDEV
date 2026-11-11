import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".buy",
    "property": "background-image",
    "expected": [
      "linear-gradient(180deg, #6366f1, #4f46e5)",
      "linear-gradient(rgb(99, 102, 241), rgb(79, 70, 229))"
    ],
    "message": "The button has a subtle gradient"
  },
  {
    "type": "computedStyle",
    "selector": ".buy",
    "property": "border-radius",
    "expected": [
      "0.5rem",
      "8px"
    ],
    "message": "...and `0.5rem` corners."
  }
];

export default checks;
