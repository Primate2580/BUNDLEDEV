import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "animation-name",
    "expected": [
      "pulse"
    ],
    "message": "The button plays `pulse`"
  },
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "animation-duration",
    "expected": [
      "1.5s",
      "1500ms"
    ],
    "message": "...in `1.5s`"
  },
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "animation-iteration-count",
    "expected": [
      "infinite"
    ],
    "message": "...for now, forever."
  }
];

export default checks;
