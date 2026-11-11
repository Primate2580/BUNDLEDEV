import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".page",
    "property": "max-width",
    "expected": [
      "30rem",
      "480px"
    ],
    "message": "The page is `30rem` wide, from `.page`."
  }
];

export default checks;
