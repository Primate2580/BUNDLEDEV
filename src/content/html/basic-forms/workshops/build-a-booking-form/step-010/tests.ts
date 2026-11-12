import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "input[type=\"checkbox\"][name=\"reminder\"][value=\"yes\"]",
    "message": "The form has a reminder checkbox"
  },
  {
    "type": "exists",
    "selector": "label[for=\"reminder\"]",
    "message": "...with a label."
  }
];

export default checks;
