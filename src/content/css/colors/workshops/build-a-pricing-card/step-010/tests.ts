import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".cta-ghost",
    "property": "background-color",
    "expected": [
      "transparent",
      "rgba(0, 0, 0, 0)"
    ],
    "message": "The ghost button has no fill: `transparent`."
  },
  {
    "type": "computedStyle",
    "selector": ".cta-ghost",
    "property": "color",
    "expected": [
      "#4f46e5",
      "rgb(79, 70, 229)"
    ],
    "message": "...indigo text"
  },
  {
    "type": "computedStyle",
    "selector": ".cta-ghost",
    "property": "border-color",
    "expected": [
      "#4f46e5",
      "rgb(79, 70, 229)"
    ],
    "message": "...and an indigo border."
  }
];

export default checks;
