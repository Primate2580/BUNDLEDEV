import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".footer",
    "property": "padding-top",
    "expected": [
      "1.5rem",
      "24px"
    ],
    "message": "The footer has `1.5rem` of padding"
  },
  {
    "type": "computedStyle",
    "selector": ".footer",
    "property": "text-align",
    "expected": [
      "center"
    ],
    "message": "...and centred text."
  }
];

export default checks;
