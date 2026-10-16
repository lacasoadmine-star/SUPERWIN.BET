import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod/v3";
import { getGame } from "../lib/catalog.js";

export default defineTool({
  description:
    "Look up one Superwin special game by id, name, or alias. Call this before explaining rules or how to play.",
  execution: "server",
  effect: "read",
  inputSchema: z.object({
    query: z
      .string()
      .min(1)
      .describe("Game id, name, or alias such as mines, crash, or plinko."),
  }),
  async execute({ query }) {
    return getGame(query);
  },
});
