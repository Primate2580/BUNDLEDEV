import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".note",
    "property": "display",
    "expected": "none",
    "message": "The note is removed from the page."
  }
];

export default checks;
