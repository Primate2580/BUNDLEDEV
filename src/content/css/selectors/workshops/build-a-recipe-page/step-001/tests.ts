import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "h1",
    "property": "color",
    "expected": "#1e1b4b",
    "message": "The `h1` is dark indigo (`#1e1b4b`)."
  }
];

export default checks;
