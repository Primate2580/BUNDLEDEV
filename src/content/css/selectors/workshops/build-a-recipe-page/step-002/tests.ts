import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".intro",
    "property": "font-style",
    "expected": "italic",
    "message": "The intro paragraph is italic."
  }
];

export default checks;
