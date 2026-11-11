import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "dl > dt",
    "message": "The glossary has two terms",
    "min": 2,
    "max": 2
  },
  {
    "type": "count",
    "selector": "dl > dd",
    "message": "...and two descriptions",
    "min": 2,
    "max": 2
  }
];

export default checks;
