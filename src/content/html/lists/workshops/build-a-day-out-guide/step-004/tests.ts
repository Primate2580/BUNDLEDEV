import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "ol[start=\"4\"]",
    "attribute": "start",
    "expected": "4",
    "message": "The list starts at 4"
  },
  {
    "type": "text",
    "selector": "ol[start=\"4\"] li",
    "includes": "Sign the visitor book",
    "message": "...and has the two steps in it."
  }
];

export default checks;
