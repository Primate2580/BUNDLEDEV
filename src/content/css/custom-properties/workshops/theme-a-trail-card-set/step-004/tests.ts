import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ":root",
    "property": "--radius",
    "expected": [
      "0.75rem",
      " 0.75rem"
    ],
    "message": "`--radius` is `0.75rem`"
  },
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "border-radius",
    "expected": [
      "var(--radius)",
      "12px"
    ],
    "message": "...the card uses it"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "border-radius",
    "expected": [
      "var(--radius)",
      "12px"
    ],
    "message": "...and so does the button."
  }
];

export default checks;
