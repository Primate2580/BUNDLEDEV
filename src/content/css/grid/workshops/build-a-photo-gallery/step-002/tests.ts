import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "gridTracks",
    "selector": ".gallery",
    "axis": "columns",
    "count": 3,
    "message": "The gallery has three columns."
  }
];

export default checks;
