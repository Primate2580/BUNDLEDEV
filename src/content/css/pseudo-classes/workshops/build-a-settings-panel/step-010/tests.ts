import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".panel-title",
    "property": "font-size",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "The title is `1.5rem`."
  }
];

export default checks;
