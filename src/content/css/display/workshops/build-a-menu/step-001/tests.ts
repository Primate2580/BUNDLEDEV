import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".menu-list li",
    "property": "display",
    "expected": "inline-block",
    "match": "all",
    "message": "Every menu item is `inline-block`, so they sit in a row."
  }
];

export default checks;
