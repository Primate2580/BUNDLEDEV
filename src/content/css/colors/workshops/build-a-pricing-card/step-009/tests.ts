import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".plan",
    "property": "box-shadow",
    "expected": [
      "0 12px 32px rgb(79 70 229 / 0.25)",
      "rgba(79, 70, 229, 0.25) 0px 12px 32px 0px"
    ],
    "message": "The card has a soft indigo shadow."
  }
];

export default checks;
