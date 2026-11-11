import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "img[src=\"images/mill-creek.jpg\"][alt]:not([alt=\"\"])",
    "message": "The main picture is on the page, with a real alt"
  }
];

export default checks;
