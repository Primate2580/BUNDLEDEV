import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "img[src=\"images/mill-creek.jpg\"]",
    "attribute": "fetchpriority",
    "message": "The main picture is fetched first",
    "expected": "high"
  },
  {
    "type": "count",
    "selector": "img[src=\"images/mill-creek.jpg\"][loading]",
    "message": "...and it is not lazy.",
    "max": 0
  }
];

export default checks;
