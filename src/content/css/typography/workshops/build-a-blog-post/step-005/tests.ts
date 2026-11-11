import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".post-title",
    "property": "font-size",
    "expected": [
      "2.5rem",
      "40px"
    ],
    "message": "The title is `2.5rem`."
  },
  {
    "type": "computedStyle",
    "selector": ".post-title",
    "property": "font-weight",
    "expected": [
      "800"
    ],
    "message": "...weight `800`"
  },
  {
    "type": "computedStyle",
    "selector": ".post-title",
    "property": "line-height",
    "expected": [
      "1.15",
      "46px"
    ],
    "message": "...with a line height of `1.15`."
  }
];

export default checks;
