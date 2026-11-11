import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".post-title",
    "property": "letter-spacing",
    "expected": [
      "-0.02em",
      "-0.8px"
    ],
    "message": "The title is slightly tightened: `-0.02em`."
  }
];

export default checks;
