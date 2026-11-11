import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "table > thead > tr > th",
    "message": "The heading row is in a `thead`"
  },
  {
    "type": "count",
    "selector": "table > tbody > tr",
    "message": "...and the three data rows are in a `tbody`.",
    "min": 3,
    "max": 3
  }
];

export default checks;
