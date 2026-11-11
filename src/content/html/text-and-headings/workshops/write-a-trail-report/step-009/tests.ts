import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "p sup",
    "includes": "2",
    "message": "The square metres have a superscript 2"
  }
];

export default checks;
