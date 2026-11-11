import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".caption",
    "property": "position",
    "expected": [
      "absolute"
    ],
    "message": "The caption is `position: absolute`"
  },
  {
    "type": "computedStyle",
    "selector": ".caption",
    "property": "left",
    "expected": [
      "0px",
      "0"
    ],
    "message": "...with `left: 0`"
  },
  {
    "type": "computedStyle",
    "selector": ".caption",
    "property": "right",
    "expected": [
      "0px",
      "0"
    ],
    "message": "...`right: 0`"
  },
  {
    "type": "computedStyle",
    "selector": ".caption",
    "property": "bottom",
    "expected": [
      "0px",
      "0"
    ],
    "message": "...and `bottom: 0`."
  }
];

export default checks;
