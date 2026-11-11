import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".panel",
    "property": "box-shadow",
    "expected": [
      "0 10px 25px rgb(15 23 42 / 0.12)",
      "rgba(15, 23, 42, 0.12) 0px 10px 25px 0px"
    ],
    "message": "The panel has a soft shadow."
  }
];

export default checks;
