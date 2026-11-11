import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "display",
    "expected": [
      "flex"
    ],
    "message": "The header is a flex row"
  },
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "justify-content",
    "expected": [
      "space-between"
    ],
    "message": "...with the logo and nav pushed apart"
  },
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "padding-top",
    "expected": [
      "1rem",
      "16px"
    ],
    "message": "...and `1rem` of padding."
  }
];

export default checks;
