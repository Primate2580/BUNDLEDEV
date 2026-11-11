import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "html",
    "property": "font-size",
    "expected": [
      "112.5%",
      "18px"
    ],
    "message": "The root is `112.5%`, so the whole page scales."
  }
];

export default checks;
