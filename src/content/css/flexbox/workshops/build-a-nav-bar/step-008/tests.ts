import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".site-header",
    "property": "flex-wrap",
    "expected": "wrap",
    "message": "The header can wrap onto a new line (`flex-wrap: wrap`)."
  }
];

export default checks;
