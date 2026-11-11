import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".help-link",
    "property": "font-weight",
    "expected": [
      "600"
    ],
    "message": "The link has weight `600`."
  }
];

export default checks;
