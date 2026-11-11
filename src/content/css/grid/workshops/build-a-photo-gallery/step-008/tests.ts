import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".tile",
    "property": "display",
    "expected": "grid",
    "message": "Each tile is a grid container."
  },
  {
    "type": "computedStyle",
    "selector": ".tile",
    "property": "justify-items",
    "expected": "center",
    "message": "Labels are centred horizontally."
  },
  {
    "type": "computedStyle",
    "selector": ".tile",
    "property": "align-items",
    "expected": "center",
    "message": "Labels are centred vertically."
  }
];

export default checks;
