import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "img[src=\"images/gallery-2.jpg\"]",
    "attribute": "loading",
    "message": "The second gallery picture loads lazily",
    "expected": "lazy"
  },
  {
    "type": "attribute",
    "selector": "img[src=\"images/gallery-2.jpg\"]",
    "attribute": "height",
    "message": "...with a height of 300",
    "expected": "300"
  },
  {
    "type": "exists",
    "selector": "img[src=\"images/gallery-2.jpg\"][alt]:not([alt=\"\"])",
    "message": "...and a real alt"
  }
];

export default checks;
