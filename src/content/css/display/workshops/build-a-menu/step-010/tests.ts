import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".menu-list",
    "property": "display",
    "expected": "inline-flex",
    "message": "The list shrinks to fit its items (`display: inline-flex`)."
  }
];

export default checks;
