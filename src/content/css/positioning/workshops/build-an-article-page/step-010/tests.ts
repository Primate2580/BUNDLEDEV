import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".cookie",
    "property": "z-index",
    "expected": [
      "30"
    ],
    "message": "The notice is above everything: `z-index: 30`."
  }
];

export default checks;
