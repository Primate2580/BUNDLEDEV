import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".help",
    "property": "display",
    "expected": [
      "flex"
    ],
    "message": "The help line is a flex container"
  },
  {
    "type": "computedStyle",
    "selector": ".help",
    "property": "gap",
    "expected": [
      "0.5rem",
      "8px"
    ],
    "message": "...with a `0.5rem` gap."
  }
];

export default checks;
