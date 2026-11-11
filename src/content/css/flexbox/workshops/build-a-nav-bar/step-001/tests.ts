import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "display",
    "expected": "flex",
    "message": "The header is a flex container (`display: flex`)."
  }
];

export default checks;
