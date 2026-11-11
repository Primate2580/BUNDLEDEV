import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".features",
    "property": "color",
    "expected": [
      "darkslategray",
      "rgb(47, 79, 79)"
    ],
    "message": "The feature list is the named colour `darkslategray`."
  }
];

export default checks;
