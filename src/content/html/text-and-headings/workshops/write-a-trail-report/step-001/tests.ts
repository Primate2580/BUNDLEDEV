import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "h1",
    "message": "The page has exactly one `h1`",
    "min": 1,
    "max": 1
  },
  {
    "type": "text",
    "selector": "h1",
    "includes": "Ridge Trail report",
    "message": "...with the report's title inside it."
  }
];

export default checks;
