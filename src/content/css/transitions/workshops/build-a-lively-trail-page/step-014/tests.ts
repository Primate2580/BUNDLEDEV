import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": "html",
    "property": "scroll-behavior",
    "expected": [
      "smooth"
    ],
    "message": "The page scrolls smoothly by default."
  }
];

export default checks;
