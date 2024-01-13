export type Compatibility = "Advantages" | "Disadvantages" | "Even";
export type PokemonId = `${number}-${number}`;
export type CompatibilityRecord = {
  pokemonId: PokemonId;
  compatibility?: Compatibility;
};

export type PokemonCompatibilityTableRecord = {
  pokemonId?: PokemonId;
  description?: string;
  compatibilities: { [opponentPokemonId: PokemonId]: Compatibility };
};

export type CompatibilityJson = {
  [opponentPokemonId: PokemonId]: Compatibility;
};

export type PartyCompatibilityTableRecord = {
  partyId?: number;
  orderOpponentPokemons: PokemonId[];
  partyMembers: PokemonId[];
  compatibilities: {
    [ownPokemonId: PokemonId]: PokemonCompatibilityTableRecord;
  };
};

export type PartyCompatibilityRecordJson = {
  partyId?: number;
  orderOpponentPokemons: PokemonId[];
  party: {
    [ownPokemonId: PokemonId]: CompatibilityJson[];
  };
};

export type PokemonNameImage = {
  name: string;
  formName?: string;
  imageUrl: string;
};
