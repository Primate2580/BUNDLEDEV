import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "figure > img[src=\"images/bridge.jpg\"]",
    "message": "The bridge picture sits inside a `figure`"
  },
  {
    "type": "exists",
    "selector": "figure > figcaption",
    "message": "...with a `figcaption`."
  }
];

export default checks;
