import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod/v3";
import { isPlayerNote, playerNoteKey } from "../lib/player-note.js";

export default defineTool({
  description: "Read this session's saved display name and language, if any.",
  execution: "server",
  effect: "read",
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    const value = await ctx.host.kv.get(playerNoteKey(ctx.session.id));
    if (!isPlayerNote(value)) {
      return { found: false as const };
    }
    return {
      found: true as const,
      displayName: value.displayName,
      language: value.language,
    };
  },
});
