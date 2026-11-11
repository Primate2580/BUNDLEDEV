import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".hero-inner",
    "property": "max-width",
    "expected": [
      "40rem",
      "640px"
    ],
    "message": "The hero content is at most `40rem` wide."
  },
  {
    "type": "computedStyle",
    "selector": ".hero-inner",
    "property": "padding-top",
    "expected": [
      "2rem",
      "32px"
    ],
    "message": "...with `2rem` of padding."
  }
];

export default checks;
