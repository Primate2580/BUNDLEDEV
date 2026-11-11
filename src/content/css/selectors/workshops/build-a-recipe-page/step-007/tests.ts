import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "h2 + p",
    "property": "font-weight",
    "expected": "600",
    "message": "The paragraph right after an `h2` is semi-bold."
  }
];

export default checks;
