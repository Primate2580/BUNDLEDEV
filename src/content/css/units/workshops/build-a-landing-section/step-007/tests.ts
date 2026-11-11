import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".features",
    "property": "gap",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "The cards have a `1.5rem` gap."
  },
  {
    "type": "computedStyle",
    "selector": ".features",
    "property": "padding-top",
    "expected": [
      "2rem",
      "32px"
    ],
    "message": "...inside a section with `2rem` of padding."
  }
];

export default checks;
