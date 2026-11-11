import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "position",
    "expected": [
      "sticky"
    ],
    "message": "The header is `position: sticky`"
  },
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "top",
    "expected": [
      "0px",
      "0"
    ],
    "message": "...stuck at `top: 0`."
  }
];

export default checks;
