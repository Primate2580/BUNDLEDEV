import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".logo",
    "property": "flex-grow",
    "expected": "1",
    "message": "The logo grows to fill the free space (`flex-grow: 1`)."
  }
];

export default checks;
