import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card--featured",
    "property": "--brand",
    "expected": [
      "#ea580c",
      " #ea580c"
    ],
    "message": "The featured card has its own `--brand`."
  }
];

export default checks;
