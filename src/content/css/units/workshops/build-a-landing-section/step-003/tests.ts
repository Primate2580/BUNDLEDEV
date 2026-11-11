import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".hero",
    "property": "min-height",
    "expected": [
      "60vh"
    ],
    "message": "The hero is at least `60vh` tall."
  }
];

export default checks;
