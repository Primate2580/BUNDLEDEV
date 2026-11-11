import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".title",
    "property": "animation-name",
    "expected": [
      "rise"
    ],
    "message": "The title plays `rise`"
  },
  {
    "type": "computedStyle",
    "selector": ".title",
    "property": "animation-duration",
    "expected": [
      "0.6s",
      "600ms"
    ],
    "message": "...in `0.6s`"
  },
  {
    "type": "computedStyle",
    "selector": ".title",
    "property": "animation-fill-mode",
    "expected": [
      "both"
    ],
    "message": "...holding its first and last frames."
  }
];

export default checks;
