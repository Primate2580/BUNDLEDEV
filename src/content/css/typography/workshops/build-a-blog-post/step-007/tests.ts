import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".eyebrow",
    "property": "font-size",
    "expected": [
      "0.8125rem",
      "13px"
    ],
    "message": "The eyebrow is `0.8125rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".eyebrow",
    "property": "text-transform",
    "expected": [
      "uppercase"
    ],
    "message": "...in capitals"
  },
  {
    "type": "computedStyle",
    "selector": ".eyebrow",
    "property": "letter-spacing",
    "expected": [
      "0.1em",
      "1.3px"
    ],
    "message": "...with `0.1em` letter spacing."
  }
];

export default checks;
