export type GameCategory = "crash" | "grid" | "table" | "drop";

export type GameSummary = {
  id: string;
  name: string;
  category: GameCategory;
  tagline: string;
};

export type Game = GameSummary & {
  aliases: string[];
  players: string;
  houseEdgePct: number;
  rules: string;
  howToPlay: string;
};

const GAMES: Game[] = [
  {
    id: "crash",
    name: "Crash",
    category: "crash",
    tagline: "Watch a multiplier climb, then cash out before it crashes.",
    aliases: ["aviator", "multiplier"],
    players: "1+",
    houseEdgePct: 4,
    rules:
      "A shared multiplier starts at 1.00x and climbs until it crashes at a random point. Anyone still in when it crashes loses that round.",
    howToPlay:
      "Pick a stake and optionally an auto-cashout multiplier. Cash out manually before the crash, or let auto-cashout fire.",
  },
  {
    id: "mines",
    name: "Mines",
    category: "grid",
    tagline: "Reveal gems on a grid while avoiding hidden mines.",
    aliases: ["mine", "minesweeper"],
    players: "1",
    houseEdgePct: 1,
    rules:
      "A 5x5 grid hides a chosen number of mines. Each safe gem you reveal raises the cashout multiplier. Hitting a mine ends the round.",
    howToPlay:
      "Choose how many mines to plant, then reveal tiles one at a time. Cash out after any safe reveal, or keep going for a higher multiplier.",
  },
  {
    id: "dice",
    name: "Dice",
    category: "table",
    tagline: "Roll under or over a target number on a 0–100 slider.",
    aliases: ["roll"],
    players: "1",
    houseEdgePct: 1,
    rules:
      "A roll lands between 0.00 and 99.99. You win if the roll is under (or over) the target you set. A harder target pays a higher multiplier.",
    howToPlay:
      "Set the target, pick under or over, then roll. The displayed multiplier already includes the house edge.",
  },
  {
    id: "plinko",
    name: "Plinko",
    category: "drop",
    tagline: "Drop a ball through pegs into a multiplier bucket.",
    aliases: ["plink"],
    players: "1",
    houseEdgePct: 2,
    rules:
      "A ball bounces through rows of pegs and lands in a bucket. Edge buckets pay more and are rarer than center buckets.",
    howToPlay:
      "Choose risk (low, medium, or high) and row count, then drop. Higher risk stretches the bucket multipliers.",
  },
  {
    id: "keno",
    name: "Keno",
    category: "grid",
    tagline: "Pick numbers and see how many of the draw you hit.",
    aliases: [],
    players: "1",
    houseEdgePct: 4,
    rules:
      "You pick up to 10 numbers on a 1–40 board. The draw selects 10 numbers. Payout depends on how many of your picks hit.",
    howToPlay:
      "Mark your numbers, confirm the stake, and wait for the draw. More spots hit means a higher payout for that ticket.",
  },
  {
    id: "wheel",
    name: "Wheel",
    category: "table",
    tagline: "Spin a color wheel for a fixed multiplier.",
    aliases: ["spin", "fortune wheel"],
    players: "1+",
    houseEdgePct: 3,
    rules:
      "The wheel is divided into colored segments with fixed multipliers. A spin lands on one segment and pays that multiplier.",
    howToPlay:
      "Pick a color or multiplier segment, then spin. Lower multipliers hit more often than the jackpot slice.",
  },
];

const CATEGORIES = ["crash", "grid", "table", "drop"] as const;

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function listGames(category?: string): {
  games: GameSummary[];
  categories: GameCategory[];
} {
  const wanted = category === undefined ? undefined : normalize(category);
  const games = GAMES.filter(
    (game) => wanted === undefined || game.category === wanted,
  ).map(({ id, name, category: gameCategory, tagline }) => ({
    id,
    name,
    category: gameCategory,
    tagline,
  }));

  return { games, categories: [...CATEGORIES] };
}

export function getGame(query: string): {
  found: boolean;
  game: Game | null;
  suggestions: GameSummary[];
} {
  const needle = normalize(query);
  const match = GAMES.find((game) => {
    if (game.id === needle || normalize(game.name) === needle) {
      return true;
    }
    return game.aliases.some((alias) => normalize(alias) === needle);
  });

  if (match) {
    return { found: true, game: match, suggestions: [] };
  }

  return {
    found: false,
    game: null,
    suggestions: listGames().games,
  };
}
