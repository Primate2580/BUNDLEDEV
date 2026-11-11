import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".cookie",
    "property": "position",
    "expected": [
      "fixed"
    ],
    "message": "The notice is `position: fixed`"
  },
  {
    "type": "computedStyle",
    "selector": ".cookie",
    "property": "left",
    "expected": [
      "0px",
      "0"
    ],
    "message": "...`left: 0`"
  },
  {
    "type": "computedStyle",
    "selector": ".cookie",
    "property": "right",
    "expected": [
      "0px",
      "0"
    ],
    "message": "...`right: 0`"
  },
  {
    "type": "computedStyle",
    "selector": ".cookie",
    "property": "bottom",
    "expected": [
      "0px",
      "0"
    ],
    "message": "...`bottom: 0`."
  }
];

export default checks;
