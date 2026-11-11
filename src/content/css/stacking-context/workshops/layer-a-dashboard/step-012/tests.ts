import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".toast",
    "property": "pointer-events",
    "expected": [
      "none"
    ],
    "message": "The toast lets clicks through."
  }
];

export default checks;
