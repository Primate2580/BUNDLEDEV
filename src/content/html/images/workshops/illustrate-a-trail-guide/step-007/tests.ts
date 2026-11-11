import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "img[src=\"images/gallery-1.jpg\"]",
    "attribute": "loading",
    "message": "The first gallery picture loads lazily",
    "expected": "lazy"
  },
  {
    "type": "attribute",
    "selector": "img[src=\"images/gallery-1.jpg\"]",
    "attribute": "width",
    "message": "...with a width of 400",
    "expected": "400"
  },
  {
    "type": "exists",
    "selector": "img[src=\"images/gallery-1.jpg\"][alt]:not([alt=\"\"])",
    "message": "...and a real alt"
  }
];

export default checks;
