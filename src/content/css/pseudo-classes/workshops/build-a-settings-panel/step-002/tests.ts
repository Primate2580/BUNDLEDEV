import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".setting:nth-child(even)",
    "property": "background-color",
    "expected": [
      "#f8fafc",
      "rgb(248, 250, 252)"
    ],
    "message": "Every even row has a pale background.",
    "match": "all"
  }
];

export default checks;
