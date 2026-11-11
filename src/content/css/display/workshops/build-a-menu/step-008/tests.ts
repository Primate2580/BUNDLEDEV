import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".badge",
    "property": "visibility",
    "expected": "hidden",
    "message": "The badge is invisible but still takes up space."
  }
];

export default checks;
