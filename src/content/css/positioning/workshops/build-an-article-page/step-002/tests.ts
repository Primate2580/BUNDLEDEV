import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "z-index",
    "expected": [
      "10"
    ],
    "message": "The header is above the content: `z-index: 10`."
  }
];

export default checks;
