import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "table > tfoot th[scope=\"row\"][colspan=\"3\"]",
    "message": "The footer has a total label that spans three columns"
  },
  {
    "type": "text",
    "selector": "tfoot td",
    "includes": "16 km",
    "message": "...and the total in the last cell."
  }
];

export default checks;
