export interface Script {
  name: string;
  characters: Character[];
}

export interface Character {
  name: string;
  team: string;
  imageSrc: string;
}

export const CharacterTypes = [
  "Townsfolk",
  "Outsider",
  "Minion",
  "Demon",
] as const;

export type CharacterType = (typeof CharacterTypes)[number];
