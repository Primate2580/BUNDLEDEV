import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "a[href=\"#trails\"], a[href=\"#contact\"], a[href=\"#downloads\"]",
    "message": "The three words link to their sections",
    "min": 3,
    "max": 3
  }
];

export default checks;
