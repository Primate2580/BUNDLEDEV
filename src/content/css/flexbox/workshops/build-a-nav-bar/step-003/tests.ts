import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "align-items",
    "expected": "center",
    "message": "The items are centred vertically (`align-items: center`)."
  }
];

export default checks;
