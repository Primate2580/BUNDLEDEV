import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "body",
    "property": "font-size",
    "expected": [
      "1.125rem",
      "18px"
    ],
    "message": "The body text is `1.125rem`."
  },
  {
    "type": "computedStyle",
    "selector": "body",
    "property": "line-height",
    "expected": [
      "1.6",
      "28.8px"
    ],
    "message": "...with a line height of `1.6`."
  }
];

export default checks;
