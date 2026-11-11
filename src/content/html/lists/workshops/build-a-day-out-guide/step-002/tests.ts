import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "ol > li",
    "message": "The route is an ordered list of three items",
    "min": 3,
    "max": 3
  },
  {
    "type": "text",
    "selector": "ol li",
    "includes": "Cross the wooden bridge",
    "message": "...with the bridge as the last step."
  }
];

export default checks;
