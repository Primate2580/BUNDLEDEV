import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".buy",
    "property": "box-shadow",
    "expected": [
      "inset 0 -2px 0 rgb(0 0 0 / 0.25)",
      "rgba(0, 0, 0, 0.25) 0px -2px 0px 0px inset"
    ],
    "message": "The button has an inset ledge shadow."
  }
];

export default checks;
