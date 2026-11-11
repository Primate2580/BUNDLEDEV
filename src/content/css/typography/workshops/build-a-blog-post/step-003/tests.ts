import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "body",
    "property": "line-height",
    "expected": [
      "1.6",
      "28.8px"
    ],
    "message": "The body line height is `1.6`."
  }
];

export default checks;
