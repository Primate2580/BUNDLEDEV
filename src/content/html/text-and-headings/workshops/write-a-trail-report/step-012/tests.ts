import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "p span",
    "attribute": "lang",
    "message": "The French words sit in a `span` with `lang=\"fr\"`",
    "expected": "fr"
  },
  {
    "type": "text",
    "selector": "span",
    "includes": "Bonne randonnée",
    "message": "...and they are its text."
  }
];

export default checks;
