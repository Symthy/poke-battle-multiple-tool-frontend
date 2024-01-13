import { Compatibility, PokemonId } from "@/types/compatibility";
import Dexie from "dexie";

export class PokeBattleIndexedDB extends Dexie {
  pokemonCompatibilities!: Dexie.Table<IPokemonCompatibility, number>;
  parties!: Dexie.Table<IParty, number>;
  partyCompatibilities!: Dexie.Table<IPartyCompatibility, number>;

  constructor() {
    super("PokeBattleDB");

    this.version(1).stores({
      pokemon_compatibilities: "++id, pokemonId, description, jsonData",
      party_compatibilities: "&partyId, jsonData",
      parties:
        "++id, name, description, pokemonId1, pokemonId2, pokemonId3, pokemonId4, pokemonId5, pokemonId6",
    });
  }
}

export interface IPokemonCompatibility {
  pokemonId: PokemonId;
  description?: string;
  jsonData: { [id: PokemonId]: Compatibility };
}

export interface IParty {
  id?: number;
  name?: string;
  description?: string;
  pokemonId1: PokemonId;
  pokemonId2?: PokemonId;
  pokemonId3?: PokemonId;
  pokemonId4?: PokemonId;
  pokemonId5?: PokemonId;
  pokemonId6?: PokemonId;
}

export interface IPartyCompatibility {
  partyId?: number;
  jsonData: {
    opponentPokemons: PokemonId[];
  };
}
