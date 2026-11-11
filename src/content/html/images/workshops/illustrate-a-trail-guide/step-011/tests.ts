import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "img:not([width])",
    "message": "Every image has a width",
    "max": 0
  },
  {
    "type": "count",
    "selector": "img:not([height])",
    "message": "...and a height",
    "max": 0
  },
  {
    "type": "a11y",
    "rule": "img-alt",
    "message": "...and every image has an `alt` attribute."
  }
];

export default checks;
