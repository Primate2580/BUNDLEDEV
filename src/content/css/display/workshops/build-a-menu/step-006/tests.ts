import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".menu-list",
    "property": "display",
    "expected": "flex",
    "message": "The list is a flex container."
  },
  {
    "type": "computedStyle",
    "selector": ".menu-list",
    "property": "gap",
    "expected": "4px",
    "message": "The items have a `4px` gap, with no stray whitespace gap."
  }
];

export default checks;
