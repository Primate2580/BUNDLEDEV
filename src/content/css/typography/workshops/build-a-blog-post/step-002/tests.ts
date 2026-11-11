import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "body",
    "property": "font-size",
    "expected": [
      "1.125rem",
      "18px"
    ],
    "message": "The body text is `1.125rem`."
  }
];

export default checks;
