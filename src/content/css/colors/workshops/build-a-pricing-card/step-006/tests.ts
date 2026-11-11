import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".blurb",
    "property": "color",
    "expected": [
      "#475569",
      "rgb(71, 85, 105)"
    ],
    "message": "The description is slate grey, `#475569`."
  }
];

export default checks;
