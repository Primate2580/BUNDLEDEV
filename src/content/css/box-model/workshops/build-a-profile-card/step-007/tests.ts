import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".name",
    "property": "margin-top",
    "expected": "0px",
    "message": "The name has no top margin."
  },
  {
    "type": "computedStyle",
    "selector": ".name",
    "property": "margin-bottom",
    "expected": "4px",
    "message": "...and a `4px` bottom margin."
  }
];

export default checks;
