import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".menu",
    "property": "position",
    "expected": [
      "absolute"
    ],
    "message": "The menu is absolute"
  },
  {
    "type": "computedStyle",
    "selector": ".menu",
    "property": "z-index",
    "expected": [
      "10"
    ],
    "message": "...with a small local `z-index: 10`."
  }
];

export default checks;
