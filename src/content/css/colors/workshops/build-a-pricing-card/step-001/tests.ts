import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "body",
    "property": "background-color",
    "expected": [
      "#f1f5f9",
      "rgb(241, 245, 249)"
    ],
    "message": "The page background is `#f1f5f9`."
  }
];

export default checks;
