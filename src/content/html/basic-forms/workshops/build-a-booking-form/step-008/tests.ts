import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "input#name[required]",
    "message": "The name is required"
  },
  {
    "type": "exists",
    "selector": "input#email[required]",
    "message": "...and so is the email."
  }
];

export default checks;
