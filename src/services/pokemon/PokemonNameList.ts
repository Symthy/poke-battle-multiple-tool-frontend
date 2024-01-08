import { CONFIG_DIR } from "@/constants";
import { loadYaml } from "@/lib/yaml_loader";
import { PokemonId } from "@/types/compatibility";
import path from "path";

type PokemonListModel = {
  pokemons: [{ [k: PokemonId]: string }];
};

export class PokemonNameList {
  private pokemons: Map<PokemonId, string>;
  constructor(
    readonly pokemonListYmlPath: string = path.join(
      CONFIG_DIR,
      "pokemon_list.yml"
    )
  ) {
    this.pokemons = this.loadPokemonListYaml(pokemonListYmlPath);
  }

  private loadPokemonListYaml(ymlPath: string): Map<PokemonId, string> {
    const yamlContents = loadYaml<PokemonListModel>(ymlPath);
    const mappings = new Map<PokemonId, string>();
    for (const record of yamlContents.pokemons) {
      const key = Object.keys(record)[0] as PokemonId;
      const value = Object.values(record)[0];
      mappings.set(key, value);
    }
    return mappings;
  }

  resolveName(id: PokemonId): string | undefined {
    return this.pokemons.get(id);
  }

  getNames(): string[] {
    return Array.from(this.pokemons.values());
  }
}
