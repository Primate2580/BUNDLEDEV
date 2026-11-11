import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".gallery",
    "property": "grid-auto-flow",
    "expected": "dense",
    "message": "The grid fills holes with later items (`grid-auto-flow: dense`)."
  }
];

export default checks;
