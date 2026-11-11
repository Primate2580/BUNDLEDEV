import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".page",
    "property": "transform",
    "expected": [
      "none"
    ],
    "message": "`.page` has no transform, so fixed children follow the window."
  }
];

export default checks;
