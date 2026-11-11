import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "colgroup > col",
    "message": "The table describes four columns",
    "min": 4,
    "max": 4
  },
  {
    "type": "exists",
    "selector": "col.difficulty",
    "message": "...and the last has the class `difficulty`."
  }
];

export default checks;
