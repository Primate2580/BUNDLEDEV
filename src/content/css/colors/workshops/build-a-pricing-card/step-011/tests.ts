import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".fine-print",
    "property": "color",
    "expected": [
      "rgb(15 23 42 / 0.7)",
      "rgba(15, 23, 42, 0.7)"
    ],
    "message": "The fine print is navy at 70% alpha."
  }
];

export default checks;
