import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "p",
    "message": "The page has at least three paragraphs",
    "min": 3
  },
  {
    "type": "text",
    "selector": "p",
    "includes": "Parking is free",
    "message": "...including the parking line."
  }
];

export default checks;
