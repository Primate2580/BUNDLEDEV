import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".overlay",
    "property": "position",
    "expected": [
      "fixed"
    ],
    "message": "The overlay is `position: fixed`"
  },
  {
    "type": "computedStyle",
    "selector": ".overlay",
    "property": "z-index",
    "expected": [
      "200"
    ],
    "message": "...at level `200`."
  }
];

export default checks;
