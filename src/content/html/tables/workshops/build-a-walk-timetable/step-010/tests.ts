import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "div.scroll > table",
    "message": "The table sits inside a scrolling wrapper"
  },
  {
    "type": "attribute",
    "selector": "div.scroll",
    "attribute": "tabindex",
    "expected": "0",
    "message": "...that a keyboard can reach"
  },
  {
    "type": "text",
    "selector": "style",
    "includes": "overflow-x",
    "message": "...with a rule that lets it scroll."
  }
];

export default checks;
