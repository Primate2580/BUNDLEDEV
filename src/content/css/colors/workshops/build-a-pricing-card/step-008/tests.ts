import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "background-color",
    "expected": [
      "#4f46e5",
      "rgb(79, 70, 229)"
    ],
    "message": "The main button is indigo, `#4f46e5`."
  },
  {
    "type": "computedStyle",
    "selector": ".cta",
    "property": "color",
    "expected": [
      "white",
      "rgb(255, 255, 255)"
    ],
    "message": "...with a white label."
  }
];

export default checks;
