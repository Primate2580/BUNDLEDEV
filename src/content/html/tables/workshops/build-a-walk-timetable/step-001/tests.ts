import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "th",
    "message": "The table has four heading cells",
    "min": 4,
    "max": 4
  },
  {
    "type": "count",
    "selector": "table tr",
    "message": "...in one row.",
    "min": 1,
    "max": 1
  }
];

export default checks;
