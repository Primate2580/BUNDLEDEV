import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".toc",
    "property": "position",
    "expected": [
      "sticky"
    ],
    "message": "The contents list is `position: sticky`"
  },
  {
    "type": "computedStyle",
    "selector": ".toc",
    "property": "top",
    "expected": [
      "5rem",
      "80px"
    ],
    "message": "...`5rem` below the top."
  }
];

export default checks;
