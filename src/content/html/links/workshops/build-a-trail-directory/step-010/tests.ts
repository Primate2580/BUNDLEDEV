import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "a[href=\"mailto:rangers@example.com\"]",
    "message": "The email address is a `mailto:` link"
  },
  {
    "type": "text",
    "selector": "a[href^=\"mailto:\"]",
    "includes": "rangers@example.com",
    "message": "...and shows the address."
  }
];

export default checks;
