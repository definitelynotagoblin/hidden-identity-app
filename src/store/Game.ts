export interface UnifiedGame {
  players: Record<string, string>;
  playersToRoles: PlayerSet;
  gmSecretHash: string;
  gameStarted: boolean;
}

export interface PlayerSet {
  [s: string]: string;
}

export interface Self {
  name: string | undefined;
  role: string | undefined;
}
