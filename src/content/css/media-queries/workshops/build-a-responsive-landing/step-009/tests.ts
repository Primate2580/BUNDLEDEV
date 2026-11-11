import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "border-radius",
    "expected": [
      "999px"
    ],
    "message": "The button is a pill"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "transition-duration",
    "expected": [
      "0.2s"
    ],
    "message": "...with a `0.2s` colour transition."
  }
];

export default checks;
