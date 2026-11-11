import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "h2#trails",
    "message": "The headings have the ids `trails`"
  },
  {
    "type": "exists",
    "selector": "h2#contact",
    "message": "...`contact`"
  },
  {
    "type": "exists",
    "selector": "h2#downloads",
    "message": "...and `downloads`"
  }
];

export default checks;
