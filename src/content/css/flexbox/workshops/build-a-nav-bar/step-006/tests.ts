import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "min-height",
    "expected": "64px",
    "message": "The header is at least `64px` tall."
  }
];

export default checks;
