import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "img[src=\"images/divider.png\"]",
    "attribute": "alt",
    "message": "The divider is decorative, with `alt=\"\"`",
    "expected": ""
  }
];

export default checks;
