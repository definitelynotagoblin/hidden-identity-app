export interface Script {
  name: string;
  imageSrc: string;
  characters: Character[];
}

export interface Character {
  name: string;
  team: string;
  imageSrc: string;
}
