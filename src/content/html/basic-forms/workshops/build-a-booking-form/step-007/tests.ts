import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "form > button[type=\"submit\"]",
    "message": "The form ends with a submit button"
  },
  {
    "type": "text",
    "selector": "button",
    "includes": "Send",
    "message": "...that says `Send`."
  }
];

export default checks;
