import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ":root",
    "property": "--cols",
    "expected": [
      "1",
      " 1",
      "3",
      " 3"
    ],
    "message": "`--cols` is set on `:root`, `1` on narrow screens."
  }
];

export default checks;
