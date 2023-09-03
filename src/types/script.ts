export interface Script {
  name: string;
  imageSrc: string;
  characters: Character[];
}

export interface Character {
  id: string;
  name: string;
  team: string;
  imageSrc: string;
}

export interface CharacterId {
  id: string;
}

export const CharacterTypes = [
  "Townsfolk",
  "Outsider",
  "Minion",
  "Demon",
] as const;

export type CharacterType = (typeof CharacterTypes)[number];
