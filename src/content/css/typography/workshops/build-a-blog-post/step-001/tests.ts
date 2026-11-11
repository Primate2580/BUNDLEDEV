import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "body",
    "property": "font-family",
    "expected": [
      "Georgia, \"Times New Roman\", serif"
    ],
    "message": "The body font stack is `Georgia, \"Times New Roman\", serif`."
  }
];

export default checks;
