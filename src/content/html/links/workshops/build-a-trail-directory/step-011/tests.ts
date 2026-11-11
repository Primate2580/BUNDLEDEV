import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "a[href=\"tel:+15550142\"]",
    "message": "The phone number is a `tel:` link"
  },
  {
    "type": "text",
    "selector": "a[href^=\"tel:\"]",
    "includes": "555 0142",
    "message": "...and shows the number."
  }
];

export default checks;
