import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".spinner",
    "property": "animation-name",
    "expected": [
      "spin"
    ],
    "message": "The ring plays the keyframes named `spin`."
  }
];

export default checks;
