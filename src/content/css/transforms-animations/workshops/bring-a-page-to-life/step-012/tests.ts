import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "animation-iteration-count",
    "expected": [
      "3"
    ],
    "message": "The button pulses `3` times and then rests."
  }
];

export default checks;
