import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".media",
    "property": "background-color",
    "expected": [
      "#4f46e5",
      "rgb(79, 70, 229)"
    ],
    "message": "The fallback colour is `#4f46e5`."
  },
  {
    "type": "computedStyle",
    "selector": ".media",
    "property": "background-image",
    "expected": [
      "linear-gradient(135deg, #4f46e5, #db2777)",
      "linear-gradient(135deg, rgb(79, 70, 229), rgb(219, 39, 119))"
    ],
    "message": "...and the image is the gradient."
  }
];

export default checks;
