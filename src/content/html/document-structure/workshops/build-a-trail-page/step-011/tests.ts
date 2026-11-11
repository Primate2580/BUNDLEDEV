import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "h2#lakes",
    "message": "There is an `h2` with the id `lakes`."
  },
  {
    "type": "text",
    "selector": "h2#lakes",
    "includes": "Lake loop",
    "message": "That heading says `Lake loop`."
  }
];

export default checks;
