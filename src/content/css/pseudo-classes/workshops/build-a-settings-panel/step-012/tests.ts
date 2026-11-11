import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".settings",
    "property": "list-style-type",
    "expected": [
      "none"
    ],
    "message": "The list has no bullets of its own."
  }
];

export default checks;
