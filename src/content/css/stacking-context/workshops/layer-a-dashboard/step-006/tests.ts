import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".page",
    "property": "isolation",
    "expected": [
      "isolate"
    ],
    "message": "The page content is an isolated stacking context."
  }
];

export default checks;
