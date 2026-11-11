import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".link.current",
    "property": "font-weight",
    "expected": "700",
    "message": "The current link is bold."
  },
  {
    "type": "computedStyle",
    "selector": ".link.current",
    "property": "background-color",
    "expected": "#e0e7ff",
    "message": "...and has a light indigo background."
  }
];

export default checks;
