import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod/v3";
import { listGames } from "../lib/catalog.js";

export default defineTool({
  description:
    "List Superwin special games from the catalog. Optionally filter by category: crash, grid, table, or drop.",
  execution: "server",
  effect: "read",
  inputSchema: z.object({
    category: z
      .enum(["crash", "grid", "table", "drop"])
      .optional()
      .describe("Optional catalog category."),
  }),
  async execute({ category }) {
    return listGames(category);
  },
});
