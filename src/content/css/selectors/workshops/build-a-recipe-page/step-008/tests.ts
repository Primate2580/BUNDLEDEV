import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "a[href^=\"https\"]",
    "property": "color",
    "expected": "#047857",
    "message": "The external link is green (`#047857`)."
  }
];

export default checks;
