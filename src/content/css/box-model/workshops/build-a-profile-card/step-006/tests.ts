import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "box-sizing",
    "expected": "border-box",
    "message": "Width includes padding and border (`box-sizing: border-box`)."
  }
];

export default checks;
