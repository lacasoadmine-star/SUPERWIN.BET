---
description: Use when the user wants a game pick, a comparison, or help choosing among Superwin special games.
---

# Recommend a special game

1. Call `list_games` unless you already have the current catalog from this turn.
2. If they named a title, call `get_game` for each named title.
3. Match one catalog game to what they asked for:
   - short rounds / watch a multiplier → Crash
   - reveal tiles / minesweeper feel → Mines
   - set a target number → Dice
   - drop / bounce → Plinko
   - pick numbers → Keno
   - spin a wheel → Wheel
4. Recommend only catalog titles. If nothing fits, say so and list the six games.
5. Do not claim a game is "due", hot, or likely to hit. Stick to rules and pace.
