import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "padding-top",
    "expected": "24px",
    "message": "The card has `24px` of padding at the top."
  },
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "padding-left",
    "expected": "24px",
    "message": "...and `24px` on the left."
  }
];

export default checks;
