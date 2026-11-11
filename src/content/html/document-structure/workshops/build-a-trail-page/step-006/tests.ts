import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "body > h1",
    "includes": "Trail Guide",
    "message": "The `body` contains an `h1` that says `Trail Guide`."
  },
  {
    "type": "count",
    "selector": "h1",
    "min": 1,
    "max": 1,
    "message": "There is exactly one `h1`."
  }
];

export default checks;
