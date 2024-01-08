export type Compatibility = "Advantages" | "Disadvantages" | "Even";
export type PokemonId = `${number}-${number}`;
export type CompatibilityRecord = {
  pokemonId: PokemonId;
  compatibility?: Compatibility;
};
export type CompatibilityRecordJson = {
  pokemonId: PokemonId;
  compatibility?: Compatibility;
};

export type PartyCompatibilityRecordsJson = {
  displayOrderPokemons: PokemonId[];
  party: {
    [ownPokemonId: PokemonId]: CompatibilityRecordJson[];
  };
};

export type PokemonNameImage = {
  name: string;
  formName?: string;
  imageUrl: string;
};
