import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "hr",
    "message": "A thematic break separates the report from its closing details"
  },
  {
    "type": "text",
    "selector": "p small",
    "includes": "© 2026 Ridge & Valley Park",
    "message": "...and the fine print is in a `small`."
  }
];

export default checks;
