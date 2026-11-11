import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".plan",
    "property": "border-color",
    "expected": [
      "#4f46e5",
      "rgb(79, 70, 229)"
    ],
    "message": "The card border is indigo, `#4f46e5`."
  }
];

export default checks;
