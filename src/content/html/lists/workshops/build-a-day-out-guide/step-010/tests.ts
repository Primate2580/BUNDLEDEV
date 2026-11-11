import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "ul.menu",
    "attribute": "role",
    "expected": "list",
    "message": "The menu list is announced as a list"
  },
  {
    "type": "count",
    "selector": "ul > :not(li), ol > :not(li)",
    "message": "...and only `li` elements sit directly in any list.",
    "max": 0
  }
];

export default checks;
