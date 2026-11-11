import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".footer",
    "property": "font-size",
    "expected": [
      "0.875rem",
      "14px"
    ],
    "message": "The footer text is `0.875rem`."
  }
];

export default checks;
