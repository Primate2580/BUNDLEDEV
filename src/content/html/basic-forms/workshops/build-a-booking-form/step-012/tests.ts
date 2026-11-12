import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "a11y",
    "rule": "label-for-input",
    "message": "...and every control has a label."
  },
  {
    "type": "exists",
    "selector": "p.field > label",
    "message": "The fields use the class `field`"
  },
  {
    "type": "text",
    "selector": "style",
    "includes": "label",
    "message": "...and the page has a rule for the labels."
  }
];

export default checks;
