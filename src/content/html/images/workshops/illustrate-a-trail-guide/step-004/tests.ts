import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "img[src=\"images/bridge.jpg\"][alt]:not([alt=\"\"])",
    "message": "The bridge picture has a real alt"
  },
  {
    "type": "attribute",
    "selector": "img[src=\"images/bridge.jpg\"]",
    "attribute": "width",
    "message": "...and a width of 600",
    "expected": "600"
  }
];

export default checks;
