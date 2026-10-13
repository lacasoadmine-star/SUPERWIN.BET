export type PlayerLanguage = "so" | "en";

export type PlayerNote = {
  displayName: string;
  language: PlayerLanguage;
};

export function playerNoteKey(sessionId: string): string {
  return `session:${sessionId}:player-note`;
}

export function isPlayerNote(value: unknown): value is PlayerNote {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.displayName === "string" &&
    record.displayName.length > 0 &&
    (record.language === "so" || record.language === "en")
  );
}
