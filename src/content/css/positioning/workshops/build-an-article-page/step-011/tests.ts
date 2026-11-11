import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "body",
    "property": "padding-bottom",
    "expected": [
      "4rem",
      "64px"
    ],
    "message": "The page leaves `4rem` of room under the fixed banner."
  }
];

export default checks;
