import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".setting",
    "property": "padding-top",
    "expected": [
      "0.75rem",
      "12px"
    ],
    "message": "Each row has `0.75rem` of padding"
  },
  {
    "type": "computedStyle",
    "selector": ".setting:not(:last-child)",
    "property": "border-bottom-style",
    "expected": [
      "solid"
    ],
    "message": "...every row except the last has a solid divider",
    "match": "all"
  },
  {
    "type": "computedStyle",
    "selector": ".setting:not(:last-child)",
    "property": "border-bottom-width",
    "expected": [
      "1px"
    ],
    "message": "...`1px` thick.",
    "match": "all"
  }
];

export default checks;
