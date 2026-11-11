import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "thead th[scope=\"col\"]",
    "message": "All four column headings have `scope=\"col\"`",
    "min": 4,
    "max": 4
  }
];

export default checks;
