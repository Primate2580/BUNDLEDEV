import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "table.timetable",
    "message": "The table has the class `timetable`"
  },
  {
    "type": "text",
    "selector": "style",
    "includes": "border-collapse",
    "message": "...the borders collapse into single lines"
  },
  {
    "type": "text",
    "selector": "style",
    "includes": "padding",
    "message": "...the cells have padding"
  },
  {
    "type": "text",
    "selector": "style",
    "includes": ".difficulty",
    "message": "...and the last column has a background."
  }
];

export default checks;
