import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".ingredient.optional",
    "property": "color",
    "expected": "#6b7280",
    "message": "The optional ingredient is grey (`#6b7280`)."
  }
];

export default checks;
