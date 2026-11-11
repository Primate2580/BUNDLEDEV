import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "justify-content",
    "expected": "flex-start",
    "message": "Items are packed from the start (`justify-content: flex-start`)."
  }
];

export default checks;
