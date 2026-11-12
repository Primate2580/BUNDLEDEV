import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "label[for=\"email\"]",
    "message": "The email field has a label"
  },
  {
    "type": "attribute",
    "selector": "input#email",
    "attribute": "type",
    "expected": "email",
    "message": "...an `email` input"
  },
  {
    "type": "attribute",
    "selector": "input#email",
    "attribute": "name",
    "expected": "email",
    "message": "...with the name `email`."
  }
];

export default checks;
