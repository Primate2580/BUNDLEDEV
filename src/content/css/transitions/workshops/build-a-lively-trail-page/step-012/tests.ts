import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".faq-panel",
    "property": "transition-property",
    "expected": [
      "grid-template-rows"
    ],
    "message": "The panel transitions `grid-template-rows`"
  },
  {
    "type": "computedStyle",
    "selector": ".faq-panel",
    "property": "transition-duration",
    "expected": [
      "0.3s",
      "300ms"
    ],
    "message": "...over `0.3s`."
  }
];

export default checks;
