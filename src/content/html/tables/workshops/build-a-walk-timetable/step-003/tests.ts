import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "td",
    "message": "The table has twelve data cells",
    "min": 12,
    "max": 12
  },
  {
    "type": "count",
    "selector": "tr",
    "message": "...in four rows.",
    "min": 4,
    "max": 4
  }
];

export default checks;
