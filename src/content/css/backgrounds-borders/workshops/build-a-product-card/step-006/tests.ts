import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".badge",
    "property": "background-color",
    "expected": [
      "#0f172a",
      "rgb(15, 23, 42)"
    ],
    "message": "The badge is dark navy"
  },
  {
    "type": "computedStyle",
    "selector": ".badge",
    "property": "border-radius",
    "expected": [
      "999px"
    ],
    "message": "...and a pill."
  }
];

export default checks;
