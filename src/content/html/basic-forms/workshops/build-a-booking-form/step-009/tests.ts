import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "input#name",
    "attribute": "autocomplete",
    "expected": "name",
    "message": "The name field can be filled in automatically"
  },
  {
    "type": "attribute",
    "selector": "input#email",
    "attribute": "autocomplete",
    "expected": "email",
    "message": "...and so can the email field."
  }
];

export default checks;
