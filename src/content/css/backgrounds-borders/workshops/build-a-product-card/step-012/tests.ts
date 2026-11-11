import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".buy",
    "property": "outline-width",
    "expected": [
      "3px"
    ],
    "message": "The ring is `3px` thick"
  },
  {
    "type": "computedStyle",
    "selector": ".buy",
    "property": "outline-style",
    "expected": [
      "solid"
    ],
    "message": "...`solid`"
  },
  {
    "type": "computedStyle",
    "selector": ".buy",
    "property": "outline-offset",
    "expected": [
      "3px"
    ],
    "message": "...and offset by `3px`."
  }
];

export default checks;
