import { defineEval } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "Saves a display name and Somali language preference.",
  async test(t) {
    await t.send("Save my display name as Amina and my language as so.");
    t.succeeded();
    t.calledTool("save_player_note", {
      input: { displayName: "Amina", language: "so" },
    });
    t.notCalledTool("read_player_note");
  },
});
