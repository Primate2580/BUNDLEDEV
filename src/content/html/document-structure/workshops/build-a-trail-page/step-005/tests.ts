import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "head > title",
    "includes": "Trail Guide",
    "message": "The page has a `title` that says `Trail Guide`."
  },
  {
    "type": "count",
    "selector": "head > title",
    "min": 1,
    "max": 1,
    "message": "There is exactly one `title`."
  }
];

export default checks;
