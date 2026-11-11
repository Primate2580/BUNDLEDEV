import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".badge",
    "property": "background-color",
    "expected": [
      "#fde68a",
      "rgb(253, 230, 138)"
    ],
    "message": "The badge is `#fde68a`"
  },
  {
    "type": "computedStyle",
    "selector": ".badge",
    "property": "color",
    "expected": [
      "#78350f",
      "rgb(120, 53, 15)"
    ],
    "message": "...with `#78350f` text."
  }
];

export default checks;
