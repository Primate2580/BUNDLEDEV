import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "justify-content",
    "expected": "space-between",
    "message": "The free space is shared between the items (`space-between`)."
  }
];

export default checks;
