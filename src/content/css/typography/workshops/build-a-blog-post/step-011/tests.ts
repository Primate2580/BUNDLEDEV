import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".code",
    "property": "font-family",
    "expected": [
      "ui-monospace, \"SFMono-Regular\", Menlo, Consolas, monospace"
    ],
    "message": "The code uses a monospace stack."
  },
  {
    "type": "computedStyle",
    "selector": ".code",
    "property": "font-size",
    "expected": [
      "0.9em",
      "16.2px"
    ],
    "message": "...at `0.9em`."
  }
];

export default checks;
