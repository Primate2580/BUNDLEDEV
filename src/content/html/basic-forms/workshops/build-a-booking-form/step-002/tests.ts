import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "label[for=\"name\"]",
    "message": "The name field has a label"
  },
  {
    "type": "attribute",
    "selector": "input#name",
    "attribute": "type",
    "expected": "text",
    "message": "...a text input"
  },
  {
    "type": "attribute",
    "selector": "input#name",
    "attribute": "name",
    "expected": "name",
    "message": "...with the name `name`."
  }
];

export default checks;
