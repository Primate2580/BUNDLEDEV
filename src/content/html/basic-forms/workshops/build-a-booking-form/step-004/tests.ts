import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "label[for=\"walk\"]",
    "message": "The menu has a label"
  },
  {
    "type": "count",
    "selector": "select#walk > option",
    "message": "...and three options.",
    "min": 3,
    "max": 3
  }
];

export default checks;
