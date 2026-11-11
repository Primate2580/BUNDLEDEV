import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "#title",
    "property": "text-transform",
    "expected": "uppercase",
    "message": "The title is shown in capitals."
  }
];

export default checks;
