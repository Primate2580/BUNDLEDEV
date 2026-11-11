import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "h2",
    "message": "The page has two `h2` sections",
    "min": 2,
    "max": 2
  },
  {
    "type": "text",
    "selector": "h2",
    "includes": "Safety",
    "message": "...including `Safety`"
  },
  {
    "type": "a11y",
    "rule": "heading-order",
    "message": "...and the heading levels are in order."
  }
];

export default checks;
