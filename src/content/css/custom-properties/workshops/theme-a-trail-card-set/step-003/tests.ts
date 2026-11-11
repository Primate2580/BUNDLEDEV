import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ":root",
    "property": "--space-3",
    "expected": [
      "1rem",
      " 1rem"
    ],
    "message": "`--space-3` is `1rem`"
  },
  {
    "type": "computedStyle",
    "selector": ".card",
    "property": "padding",
    "expected": [
      "var(--space-3)",
      "16px"
    ],
    "message": "...the card pads with it"
  },
  {
    "type": "computedStyle",
    "selector": ".cards",
    "property": "gap",
    "expected": [
      "var(--space-3)",
      "16px"
    ],
    "message": "...the cards are spaced by it"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "padding",
    "expected": [
      "var(--space-2) var(--space-3)",
      "8px 16px"
    ],
    "message": "...and the button uses both."
  }
];

export default checks;
