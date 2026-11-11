import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".badge",
    "property": "background-color",
    "expected": [
      "rgb(79 70 229 / 0.12)",
      "rgba(79, 70, 229, 0.12)"
    ],
    "message": "The badge fill is indigo at 12% alpha."
  },
  {
    "type": "computedStyle",
    "selector": ".badge",
    "property": "color",
    "expected": [
      "#4338ca",
      "rgb(67, 56, 202)"
    ],
    "message": "...with `#4338ca` text."
  }
];

export default checks;
