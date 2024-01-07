import { load } from "js-yaml";
import { readFileSync } from "fs";
import { PokemonId } from "@/types/compatibility";
import path from "path";
import { CONFIG_DIR } from "@/constants";

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
    const yamlContents: any = load(readFileSync(mappingYmlPath, "utf8"));
    const mappings = new Map<PokemonId, number>();
    for (const key in yamlContents.mapping) {
      const value = yamlContents.mapping[key];
      mappings.set(key as PokemonId, value);
    }
    return mappings;
  }

  getFormPokemonId(pokemonId: PokemonId): number | undefined {
    return this.mappings.get(pokemonId);
  }
}
