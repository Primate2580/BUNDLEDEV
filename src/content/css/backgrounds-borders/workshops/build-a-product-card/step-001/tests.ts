import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".product",
    "property": "border-width",
    "expected": [
      "1px"
    ],
    "message": "The card border is `1px` wide"
  },
  {
    "type": "computedStyle",
    "selector": ".product",
    "property": "border-style",
    "expected": [
      "solid"
    ],
    "message": "...`solid`"
  },
  {
    "type": "computedStyle",
    "selector": ".product",
    "property": "border-color",
    "expected": [
      "#cbd5e1",
      "rgb(203, 213, 225)"
    ],
    "message": "...in `#cbd5e1`."
  }
];

export default checks;
