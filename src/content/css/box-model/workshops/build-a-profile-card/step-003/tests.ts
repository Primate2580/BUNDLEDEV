import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "border-top-width",
    "expected": "2px",
    "message": "The border is `2px` thick."
  },
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "border-top-style",
    "expected": "solid",
    "message": "The border style is `solid`."
  }
];

export default checks;
