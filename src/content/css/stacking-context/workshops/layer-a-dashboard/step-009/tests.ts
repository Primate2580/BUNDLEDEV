import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".modal",
    "property": "position",
    "expected": [
      "fixed"
    ],
    "message": "The modal is `position: fixed`"
  },
  {
    "type": "computedStyle",
    "selector": ".modal",
    "property": "z-index",
    "expected": [
      "300"
    ],
    "message": "...at level `300`."
  }
];

export default checks;
