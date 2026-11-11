import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".faq-panel",
    "property": "display",
    "expected": [
      "grid"
    ],
    "message": "The panel is a grid container"
  },
  {
    "type": "computedStyle",
    "selector": ".faq-inner",
    "property": "overflow",
    "expected": [
      "hidden"
    ],
    "message": "...whose inner box clips with `overflow: hidden`"
  },
  {
    "type": "computedStyle",
    "selector": ".faq-label",
    "property": "cursor",
    "expected": [
      "pointer"
    ],
    "message": "...and the label shows the `pointer` cursor."
  }
];

export default checks;
