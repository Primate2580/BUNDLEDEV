import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "input#email",
    "attribute": "placeholder",
    "expected": "you@example.com",
    "message": "The email field shows an example"
  },
  {
    "type": "attribute",
    "selector": "textarea",
    "attribute": "rows",
    "expected": "4",
    "message": "...and the notes box is four rows tall."
  }
];

export default checks;
