import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".media",
    "property": "background-size",
    "expected": [
      "20px 20px, auto"
    ],
    "message": "The dots tile at `20px 20px`, and the gradient fills the box."
  }
];

export default checks;
