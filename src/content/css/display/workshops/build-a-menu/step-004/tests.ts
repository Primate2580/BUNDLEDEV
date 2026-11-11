import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".link",
    "property": "min-width",
    "expected": "72px",
    "match": "all",
    "message": "Every link is at least `72px` wide."
  },
  {
    "type": "computedStyle",
    "selector": ".link",
    "property": "text-align",
    "expected": "center",
    "match": "all",
    "message": "The text is centred."
  }
];

export default checks;
