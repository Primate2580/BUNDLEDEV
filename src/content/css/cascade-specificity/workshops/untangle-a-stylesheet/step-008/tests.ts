import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card-link",
    "property": "color",
    "expected": [
      "#4f46e5",
      "rgb(79, 70, 229)"
    ],
    "message": "The link is indigo, from `.card-link` alone."
  }
];

export default checks;
