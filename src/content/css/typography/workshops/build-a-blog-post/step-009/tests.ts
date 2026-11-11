import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".lede",
    "property": "font-size",
    "expected": [
      "1.375rem",
      "22px"
    ],
    "message": "The lede is `1.375rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".lede",
    "property": "line-height",
    "expected": [
      "1.5",
      "33px"
    ],
    "message": "...with a line height of `1.5`."
  }
];

export default checks;
