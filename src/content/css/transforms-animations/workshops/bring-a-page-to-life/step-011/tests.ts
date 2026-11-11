import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".flip",
    "property": "cursor",
    "expected": [
      "pointer"
    ],
    "message": "The card shows the `pointer` cursor."
  }
];

export default checks;
