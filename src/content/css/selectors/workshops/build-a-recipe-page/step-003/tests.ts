import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "h2",
    "property": "color",
    "expected": "#4338ca",
    "match": "all",
    "message": "Both `h2` headings are indigo (`#4338ca`)."
  }
];

export default checks;
