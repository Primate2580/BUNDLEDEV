import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".item",
    "property": "animation-name",
    "expected": [
      "rise"
    ],
    "message": "Every item plays `rise`"
  },
  {
    "type": "computedStyle",
    "selector": ".item",
    "property": "animation-duration",
    "expected": [
      "0.5s",
      "500ms"
    ],
    "message": "...in `0.5s`"
  },
  {
    "type": "computedStyle",
    "selector": ".item",
    "property": "animation-fill-mode",
    "expected": [
      "both"
    ],
    "message": "...holding its first frame while it waits."
  }
];

export default checks;
