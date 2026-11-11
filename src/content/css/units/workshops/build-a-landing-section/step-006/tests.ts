import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "border-radius",
    "expected": [
      "0.5em",
      "8px"
    ],
    "message": "The button corners are `0.5em`."
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "box-shadow",
    "expected": [
      "0 2px 0 #3730a3",
      "rgb(55, 48, 163) 0px 2px 0px 0px"
    ],
    "message": "...with a `2px` solid shadow."
  }
];

export default checks;
