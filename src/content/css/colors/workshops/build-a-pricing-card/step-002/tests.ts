import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".plan",
    "property": "background-color",
    "expected": [
      "#ffffff",
      "rgb(255, 255, 255)"
    ],
    "message": "The card background is white."
  },
  {
    "type": "computedStyle",
    "selector": ".plan",
    "property": "color",
    "expected": [
      "#0f172a",
      "rgb(15, 23, 42)"
    ],
    "message": "...and its text is `#0f172a`."
  }
];

export default checks;
