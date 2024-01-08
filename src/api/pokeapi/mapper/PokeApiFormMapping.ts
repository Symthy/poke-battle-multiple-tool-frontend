import { PokemonId } from "@/types/compatibility";
import path from "path";
import { CONFIG_DIR } from "@/constants";
import { loadYaml } from "@/lib/yaml_loader";

type PokeApiFormMappingModel = { mapping: { [k: PokemonId]: number } };

export class PokeApiFormMapping {
  private mappings: Map<PokemonId, number>;

  constructor(
    readonly mappingYmlPath: string = path.join(
      CONFIG_DIR,
      "pokeapi_form_mapping.yml"
    )
  ) {
    this.mappings = this.loadMappingsFromYaml(mappingYmlPath);
  }

  private loadMappingsFromYaml(mappingYmlPath: string): Map<PokemonId, number> {
    const yamlContents = loadYaml<PokeApiFormMappingModel>(mappingYmlPath);
    const mappings = new Map<PokemonId, number>();
    for (const key in yamlContents.mapping) {
      const pokeId = key as PokemonId;
      const value = yamlContents.mapping[pokeId];
      mappings.set(pokeId, value);
    }
    return mappings;
  }

  getFormPokemonId(pokemonId: PokemonId): number | undefined {
    return this.mappings.get(pokemonId);
  }
}
