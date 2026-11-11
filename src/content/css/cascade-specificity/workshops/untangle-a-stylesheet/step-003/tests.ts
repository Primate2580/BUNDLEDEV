import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".card-text",
    "property": "color",
    "expected": [
      "#334155",
      "rgb(51, 65, 85)"
    ],
    "message": "The text is `#334155`, set by `.card-text`."
  }
];

export default checks;
