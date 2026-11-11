import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "gridTracks",
    "selector": ".gallery",
    "axis": "columns",
    "count": 4,
    "message": "The gallery now has four columns."
  }
];

export default checks;
