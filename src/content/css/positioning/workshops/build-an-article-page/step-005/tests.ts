import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".tag",
    "property": "position",
    "expected": [
      "absolute"
    ],
    "message": "The tag is `position: absolute`"
  },
  {
    "type": "computedStyle",
    "selector": ".tag",
    "property": "top",
    "expected": [
      "0.75rem",
      "12px"
    ],
    "message": "...`0.75rem` from the top"
  },
  {
    "type": "computedStyle",
    "selector": ".tag",
    "property": "left",
    "expected": [
      "0.75rem",
      "12px"
    ],
    "message": "...and `0.75rem` from the left."
  }
];

export default checks;
