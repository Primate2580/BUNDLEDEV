import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".hero-title",
    "property": "font-size",
    "expected": [
      "2.5rem",
      "40px"
    ],
    "message": "The hero title is `2.5rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".hero-text",
    "property": "max-width",
    "expected": [
      "36ch"
    ],
    "message": "The hero text is at most `36ch` wide."
  }
];

export default checks;
