import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".gallery",
    "property": "display",
    "expected": "grid",
    "message": "The gallery is a grid container (`display: grid`)."
  }
];

export default checks;
