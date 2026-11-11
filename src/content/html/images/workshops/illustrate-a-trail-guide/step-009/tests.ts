import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "a[href=\"index.html\"] > img",
    "attribute": "alt",
    "message": "The logo links home, and its alt names the destination",
    "expected": "Ridge Park home page"
  }
];

export default checks;
