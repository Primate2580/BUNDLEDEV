import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "fieldset > legend",
    "message": "The group size has a legend"
  },
  {
    "type": "count",
    "selector": "input[type=\"radio\"][name=\"size\"]",
    "message": "...and two radio buttons share a name",
    "min": 2,
    "max": 2
  },
  {
    "type": "exists",
    "selector": "input#small[checked]",
    "message": "...with the small one chosen to begin with."
  }
];

export default checks;
