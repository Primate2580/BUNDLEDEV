import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".fab",
    "property": "z-index",
    "expected": [
      "20"
    ],
    "message": "The button is above the page: `z-index: 20`."
  }
];

export default checks;
