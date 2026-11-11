import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".byline",
    "property": "font-size",
    "expected": [
      "0.875rem",
      "14px"
    ],
    "message": "The byline is `0.875rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".byline",
    "property": "font-style",
    "expected": [
      "italic"
    ],
    "message": "...in italic."
  }
];

export default checks;
