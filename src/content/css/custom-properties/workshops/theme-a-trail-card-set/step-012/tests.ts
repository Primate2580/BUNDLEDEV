import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ":root",
    "property": "--duration",
    "expected": [
      "0.2s",
      " 0.2s"
    ],
    "message": "`--duration` is `0.2s`"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "transition-duration",
    "expected": [
      "var(--duration)",
      "0.2s"
    ],
    "message": "...and the button's transition reads it."
  }
];

export default checks;
