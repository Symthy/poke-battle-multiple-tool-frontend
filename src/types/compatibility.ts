export type Compatibility = "Advantages" | "Disadvantages" | "Even";
export type PokemonId = string;
export type CompatibilityRecord = {
  pokemonId: PokemonId;
  compatibility?: Compatibility;
};
export type CompatibilityRecordJson = {
  displayOrder: number;
  pokemonId: PokemonId;
  compatibility?: Compatibility;
};
