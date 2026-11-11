import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "table > caption:first-child",
    "includes": "Walk times and difficulty",
    "message": "The table opens with its caption."
  }
];

export default checks;
