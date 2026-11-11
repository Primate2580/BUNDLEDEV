import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".item:nth-child(2)",
    "property": "animation-delay",
    "expected": [
      "0.1s",
      "100ms"
    ],
    "message": "The second item waits `0.1s`"
  },
  {
    "type": "computedStyle",
    "selector": ".item:nth-child(3)",
    "property": "animation-delay",
    "expected": [
      "0.2s",
      "200ms"
    ],
    "message": "...and the third `0.2s`."
  }
];

export default checks;
