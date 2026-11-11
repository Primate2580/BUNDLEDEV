import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ":root",
    "property": "--shadow",
    "expected": [
      "0 4px 12px rgb(15 23 42 / 0.15)",
      " 0 4px 12px rgb(15 23 42 / 0.15)",
      "0 4px 12px rgb(15 23 42/0.15)",
      " 0 4px 12px rgb(15 23 42/0.15)"
    ],
    "message": "`--shadow` holds the whole shadow"
  },
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "box-shadow",
    "expected": [
      "var(--shadow)",
      "rgba(15, 23, 42, 0.15) 0px 4px 12px 0px"
    ],
    "message": "...and the card reads it."
  }
];

export default checks;
