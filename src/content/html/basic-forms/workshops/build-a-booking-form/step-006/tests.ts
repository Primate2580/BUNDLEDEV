import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "label[for=\"notes\"]",
    "message": "The notes box has a label"
  },
  {
    "type": "exists",
    "selector": "textarea#notes[name=\"notes\"]",
    "message": "...and a name."
  }
];

export default checks;
