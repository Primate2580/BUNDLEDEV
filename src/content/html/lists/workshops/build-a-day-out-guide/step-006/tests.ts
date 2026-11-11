import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "dl > dt",
    "message": "The glossary has three terms",
    "min": 3,
    "max": 3
  },
  {
    "type": "count",
    "selector": "dl > dd",
    "message": "...and four descriptions in all.",
    "min": 4,
    "max": 4
  }
];

export default checks;
