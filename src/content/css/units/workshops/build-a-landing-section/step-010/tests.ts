import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".icon",
    "property": "font-size",
    "expected": [
      "1.5em",
      "27px"
    ],
    "message": "The icon is `1.5em`."
  }
];

export default checks;
