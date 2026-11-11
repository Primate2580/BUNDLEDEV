import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "a[href=\"https://example.com/forecast\"]",
    "attribute": "target",
    "expected": "_blank",
    "message": "The forecast link opens in a new tab"
  },
  {
    "type": "attribute",
    "selector": "a[href=\"https://example.com/forecast\"]",
    "attribute": "rel",
    "expected": "noopener noreferrer",
    "message": "...with `rel=\"noopener noreferrer\"`."
  }
];

export default checks;
