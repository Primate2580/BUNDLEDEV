import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "address br",
    "message": "The address has a line break inside it"
  },
  {
    "type": "text",
    "selector": "address",
    "includes": "14 Mill Lane",
    "message": "...and still contains the street."
  }
];

export default checks;
