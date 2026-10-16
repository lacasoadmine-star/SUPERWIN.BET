import { defineEval, includes } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke", "catalog"],
  cases: [
    {
      id: "list",
      description: "Lists catalog games instead of inventing titles.",
      async test(t) {
        await t.send("What special games are available?");
        t.succeeded();
        t.calledTool("list_games");
        t.notCalledTool("get_game");
        t.check(t.reply, includes(/crash|mines|plinko/i));
      },
    },
    {
      id: "mines",
      description: "Looks up Mines before explaining the rules.",
      async test(t) {
        await t.send("How do I play Mines?");
        t.succeeded();
        t.calledTool("get_game");
        t.check(t.reply, includes(/mine|tile|gem/i));
      },
    },
    {
      id: "unknown",
      description: "Does not invent a title missing from the catalog.",
      async test(t) {
        await t.send("Tell me how to play Super Roulette Extreme");
        t.succeeded();
        t.calledTool("get_game");
        t.check(t.reply, includes(/catalog|available|don't have|do not have|not in/i));
      },
    },
  ],
});
