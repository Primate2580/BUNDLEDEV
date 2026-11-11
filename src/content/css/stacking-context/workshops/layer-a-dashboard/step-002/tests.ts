import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".header",
    "property": "z-index",
    "expected": [
      "100"
    ],
    "message": "The header is at level `100`."
  }
];

export default checks;
