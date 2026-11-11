import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "a[href=\"rules.html\"]",
    "message": "The rules link goes to `rules.html`"
  },
  {
    "type": "text",
    "selector": "a[href=\"rules.html\"]",
    "includes": "trail rules",
    "message": "...and its text says what is there."
  }
];

export default checks;
