import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".footnote",
    "property": "font-size",
    "expected": [
      "0.8125rem",
      "13px"
    ],
    "message": "The footnote is `0.8125rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".footnote",
    "property": "text-align",
    "expected": [
      "right"
    ],
    "message": "...aligned right."
  }
];

export default checks;
