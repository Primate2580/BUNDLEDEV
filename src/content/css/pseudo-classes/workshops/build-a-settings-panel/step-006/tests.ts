import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".save:disabled",
    "property": "background-color",
    "expected": [
      "#94a3b8",
      "rgb(148, 163, 184)"
    ],
    "message": "The disabled button is grey"
  },
  {
    "type": "computedStyle",
    "selector": ".save:disabled",
    "property": "cursor",
    "expected": [
      "not-allowed"
    ],
    "message": "...with the `not-allowed` cursor."
  }
];

export default checks;
