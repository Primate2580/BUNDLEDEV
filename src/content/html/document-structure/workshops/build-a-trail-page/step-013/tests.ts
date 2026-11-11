import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "img",
    "message": "The page contains an `img`."
  },
  {
    "type": "attribute",
    "selector": "img",
    "attribute": "src",
    "expected": "lake.jpg",
    "message": "Its `src` is `lake.jpg`."
  },
  {
    "type": "attribute",
    "selector": "img",
    "attribute": "alt",
    "message": "It has an `alt` attribute."
  },
  {
    "type": "a11y",
    "rule": "img-alt",
    "message": "Every image on the page has alt text."
  }
];

export default checks;
