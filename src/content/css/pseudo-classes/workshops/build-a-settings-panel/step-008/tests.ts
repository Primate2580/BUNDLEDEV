import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".field",
    "property": "font-size",
    "expected": [
      "1rem",
      "16px"
    ],
    "message": "The field text is `1rem`."
  }
];

export default checks;
