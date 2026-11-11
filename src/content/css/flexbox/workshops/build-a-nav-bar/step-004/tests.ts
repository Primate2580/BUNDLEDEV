import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".nav",
    "property": "display",
    "expected": "flex",
    "message": "The `.nav` element is a flex container."
  }
];

export default checks;
