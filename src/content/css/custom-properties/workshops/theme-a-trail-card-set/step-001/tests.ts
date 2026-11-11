import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ":root",
    "property": "--brand",
    "expected": [
      "#4f46e5",
      " #4f46e5"
    ],
    "message": "`--brand` is defined on `:root`"
  },
  {
    "type": "computedStyle",
    "selector": ".title",
    "property": "color",
    "expected": [
      "var(--brand)",
      "rgb(79, 70, 229)"
    ],
    "message": "...the title reads it"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "background-color",
    "expected": [
      "var(--brand)",
      "rgb(79, 70, 229)"
    ],
    "message": "...and so does the button."
  }
];

export default checks;
