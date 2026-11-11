import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "li > ul > li",
    "message": "The inner list sits inside an `li`"
  },
  {
    "type": "text",
    "selector": "li li",
    "includes": "Nuts",
    "message": "...and has `Nuts` in it."
  },
  {
    "type": "count",
    "selector": "ul > ul",
    "message": "...never directly inside the outer `ul`.",
    "max": 0
  }
];

export default checks;
