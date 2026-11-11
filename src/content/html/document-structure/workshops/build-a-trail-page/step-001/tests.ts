import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "doctype",
    "message": "The page starts with `<!doctype html>`."
  }
];

export default checks;
