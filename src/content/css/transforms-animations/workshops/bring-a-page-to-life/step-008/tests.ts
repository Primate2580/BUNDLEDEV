import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "animation-play-state",
    "expected": [
      "running"
    ],
    "message": "The button is `running` by default"
  },
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "cursor",
    "expected": [
      "pointer"
    ],
    "message": "...shows the `pointer` cursor, and pauses on hover."
  }
];

export default checks;
