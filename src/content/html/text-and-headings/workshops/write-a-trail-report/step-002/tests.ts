import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "p time",
    "attribute": "datetime",
    "message": "The date is a `time` element inside a paragraph",
    "expected": "2026-11-09"
  },
  {
    "type": "text",
    "selector": "p time",
    "includes": "9 November 2026",
    "message": "...with the date as its text."
  }
];

export default checks;
