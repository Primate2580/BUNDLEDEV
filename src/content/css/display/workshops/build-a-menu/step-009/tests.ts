import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".badge",
    "property": "display",
    "expected": "none",
    "message": "The badge is removed from the layout."
  }
];

export default checks;
