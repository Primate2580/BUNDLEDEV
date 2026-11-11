import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".per",
    "property": "color",
    "expected": [
      "hsl(215 16% 47%)",
      "rgb(101, 117, 139)"
    ],
    "message": "`/ month` is a muted blue-grey: `hsl(215 16% 47%)`."
  }
];

export default checks;
