import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".spinner",
    "property": "animation-duration",
    "expected": [
      "1s"
    ],
    "message": "The ring takes `1s` a turn"
  },
  {
    "type": "computedStyle",
    "selector": ".spinner",
    "property": "animation-timing-function",
    "expected": [
      "linear"
    ],
    "message": "...at a `linear` speed"
  },
  {
    "type": "computedStyle",
    "selector": ".spinner",
    "property": "animation-iteration-count",
    "expected": [
      "infinite"
    ],
    "message": "...forever."
  }
];

export default checks;
