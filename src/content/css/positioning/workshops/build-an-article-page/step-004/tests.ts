import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".photo",
    "property": "position",
    "expected": [
      "relative"
    ],
    "message": "The photo is the anchor: `position: relative`."
  }
];

export default checks;
