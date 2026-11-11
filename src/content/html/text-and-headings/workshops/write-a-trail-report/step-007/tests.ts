import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "p abbr",
    "attribute": "title",
    "message": "`SAR` is an `abbr` with its full form",
    "expected": "Search and Rescue"
  },
  {
    "type": "text",
    "selector": "abbr",
    "includes": "SAR",
    "message": "...and the three letters are its text."
  }
];

export default checks;
