import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "ul > li",
    "min": 3,
    "max": 3,
    "message": "The list has exactly three items."
  },
  {
    "type": "text",
    "selector": "ul > li",
    "includes": "Lake loop",
    "message": "One item says `Lake loop`."
  }
];

export default checks;
