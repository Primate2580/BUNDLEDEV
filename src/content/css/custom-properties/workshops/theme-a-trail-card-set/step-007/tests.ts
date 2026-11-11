import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "background-color",
    "expected": [
      "var(--btn-bg, var(--brand))",
      "rgb(79, 70, 229)"
    ],
    "message": "The button reads `--btn-bg`, with `--brand` as its fallback"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "color",
    "expected": [
      "var(--btn-text, #ffffff)",
      "var(--btn-text, #fff)",
      "rgb(255, 255, 255)"
    ],
    "message": "...`--btn-text`, falling back to white"
  },
  {
    "type": "computedStyle",
    "selector": ".btn",
    "property": "font-weight",
    "expected": [
      "var(--btn-weight, 700)",
      "700"
    ],
    "message": "...and `--btn-weight`, falling back to `700`."
  }
];

export default checks;
