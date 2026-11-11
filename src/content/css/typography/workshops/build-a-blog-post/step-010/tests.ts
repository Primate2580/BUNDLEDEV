import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".pullquote",
    "property": "font-size",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "The pull quote is `1.5rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".pullquote",
    "property": "font-style",
    "expected": [
      "italic"
    ],
    "message": "...in italic"
  },
  {
    "type": "computedStyle",
    "selector": ".pullquote",
    "property": "line-height",
    "expected": [
      "1.4",
      "33.6px"
    ],
    "message": "...with a line height of `1.4`."
  }
];

export default checks;
