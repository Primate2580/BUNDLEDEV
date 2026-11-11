import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "td",
    "message": "The table has eight data cells",
    "min": 8,
    "max": 8
  },
  {
    "type": "count",
    "selector": "tr",
    "message": "...in three rows.",
    "min": 3,
    "max": 3
  }
];

export default checks;
