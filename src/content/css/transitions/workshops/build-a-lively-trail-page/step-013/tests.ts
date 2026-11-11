import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".faq-arrow",
    "property": "transition-property",
    "expected": [
      "transform"
    ],
    "message": "The arrow transitions `transform`"
  },
  {
    "type": "computedStyle",
    "selector": ".faq-arrow",
    "property": "transition-duration",
    "expected": [
      "0.3s",
      "300ms"
    ],
    "message": "...over `0.3s`."
  }
];

export default checks;
