import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".hero",
    "property": "padding-top",
    "expected": [
      "2.5rem",
      "40px"
    ],
    "message": "The hero has `2.5rem` of padding at the top"
  },
  {
    "type": "computedStyle",
    "selector": ".hero",
    "property": "text-align",
    "expected": [
      "center"
    ],
    "message": "...and its text is centred."
  }
];

export default checks;
