import { PokemonId } from "@/types/compatibility";
import { POKEAPI_FORM_MAPPING } from "./data/PokeApiFormMappingJson";

class PokeApiFormMapping {
  private mappings: Map<PokemonId, number>;

  constructor() {
    this.mappings = POKEAPI_FORM_MAPPING;
  }

  getFormPokemonId(pokemonId: PokemonId): number | undefined {
    return this.mappings.get(pokemonId);
  }
}

export const pokeApiFormMapping = new PokeApiFormMapping();
