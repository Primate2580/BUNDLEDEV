import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".section-title",
    "property": "font-size",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "The section headings are `1.5rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".section-title",
    "property": "line-height",
    "expected": [
      "1.3",
      "31.2px"
    ],
    "message": "...with a line height of `1.3`."
  }
];

export default checks;
