import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card:nth-child(2)",
    "property": "transition-delay",
    "expected": [
      "0.05s",
      "50ms"
    ],
    "message": "The second card has a `0.05s` delay."
  },
  {
    "type": "computedStyle",
    "selector": ".card:nth-child(3)",
    "property": "transition-delay",
    "expected": [
      "0.1s",
      "100ms"
    ],
    "message": "...and the third has a `0.1s` delay."
  }
];

export default checks;
