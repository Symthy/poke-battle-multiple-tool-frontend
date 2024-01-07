export type Compatibility = "Advantages" | "Disadvantages" | "Even";
export type PokemonId = `${number}-${number}`;
export type CompatibilityRecord = {
  pokemonId: PokemonId;
  compatibility?: Compatibility;
};
export type CompatibilityRecordJson = {
  displayOrder: number;
  pokemonId: PokemonId;
  compatibility?: Compatibility;
};

export type PokemonNameImage = {
  name: string;
  formName?: string;
  imageUrl: string;
};
