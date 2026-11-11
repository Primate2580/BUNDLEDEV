import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".link",
    "property": "display",
    "expected": "inline-block",
    "match": "all",
    "message": "Every link is `inline-block`."
  },
  {
    "type": "computedStyle",
    "selector": ".link",
    "property": "padding-top",
    "expected": "8px",
    "match": "all",
    "message": "Every link has `8px` of vertical padding."
  }
];

export default checks;
