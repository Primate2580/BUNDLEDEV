import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".tagline",
    "property": "animation-name",
    "expected": [
      "rise"
    ],
    "message": "The tagline plays `rise`"
  },
  {
    "type": "computedStyle",
    "selector": ".tagline",
    "property": "animation-delay",
    "expected": [
      "0.2s",
      "200ms"
    ],
    "message": "...after a `0.2s` delay"
  },
  {
    "type": "computedStyle",
    "selector": ".tagline",
    "property": "animation-fill-mode",
    "expected": [
      "both"
    ],
    "message": "...hidden until it starts."
  }
];

export default checks;
