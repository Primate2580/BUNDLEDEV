import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "tbody th[scope=\"row\"]",
    "message": "The three walk names are row headings",
    "min": 3,
    "max": 3
  },
  {
    "type": "count",
    "selector": "td",
    "message": "...and nine data cells remain.",
    "min": 9,
    "max": 9
  }
];

export default checks;
