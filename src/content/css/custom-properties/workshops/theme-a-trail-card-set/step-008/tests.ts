import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn--danger",
    "property": "--btn-bg",
    "expected": [
      "#dc2626",
      " #dc2626"
    ],
    "message": "The danger variant sets its own `--btn-bg`."
  }
];

export default checks;
