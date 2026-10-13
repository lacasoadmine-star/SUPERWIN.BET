import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod/v3";
import { playerNoteKey, type PlayerNote } from "../lib/player-note.js";

export default defineTool({
  description:
    "Save this session's display name and language. Use so for Somali and en for English.",
  execution: "server",
  effect: "write",
  inputSchema: z.object({
    displayName: z.string().trim().min(1).max(40),
    language: z.enum(["so", "en"]),
  }),
  async execute({ displayName, language }, ctx) {
    const note: PlayerNote = { displayName, language };
    await ctx.host.kv.put(playerNoteKey(ctx.session.id), note);
    return { saved: true, displayName, language };
  },
});
