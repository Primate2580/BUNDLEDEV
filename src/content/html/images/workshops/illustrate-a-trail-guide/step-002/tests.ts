import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "img[src=\"images/mill-creek.jpg\"]",
    "attribute": "width",
    "message": "The main picture is 800 wide",
    "expected": "800"
  },
  {
    "type": "attribute",
    "selector": "img[src=\"images/mill-creek.jpg\"]",
    "attribute": "height",
    "message": "...and 450 tall.",
    "expected": "450"
  }
];

export default checks;
