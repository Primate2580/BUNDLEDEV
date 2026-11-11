import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".footer",
    "property": "border-top-width",
    "expected": [
      "1px"
    ],
    "message": "The footer divider is `1px`"
  },
  {
    "type": "computedStyle",
    "selector": ".footer",
    "property": "border-top-style",
    "expected": [
      "dashed"
    ],
    "message": "...`dashed`"
  },
  {
    "type": "computedStyle",
    "selector": ".footer",
    "property": "border-top-color",
    "expected": [
      "#cbd5e1",
      "rgb(203, 213, 225)"
    ],
    "message": "...in `#cbd5e1`."
  }
];

export default checks;
