import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".header",
    "property": "position",
    "expected": [
      "sticky"
    ],
    "message": "The header is `position: sticky`"
  },
  {
    "type": "computedStyle",
    "selector": ".header",
    "property": "top",
    "expected": [
      "0",
      "0px"
    ],
    "message": "...stuck to the top."
  }
];

export default checks;
