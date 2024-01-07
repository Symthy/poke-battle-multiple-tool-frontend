import { PokemonId, PokemonNameImage } from "@/types/compatibility";
import PokeGraphqlApiClient from "../PokeGraphqlApiClient";
import { PokeApiFormMapping } from "../mapper/PokeApiFormMapping";
import pokeGqlApiClient from "../PokeGraphqlApiClient";
import {
  GET_POKEMON_NAME_AND_SPRITES,
  GET_POKEMON_NAME_AND_SPRITES_FOR_FORM,
  PokemonNameAndSprites,
  PokemonNameAndSpritesForForm,
  PokemonSprites,
} from "../queries/get_pokemon_name_and_sprites";
import { notRegisteredPokemonNameImages } from "../mapper/PokeApiNotRegisterPokemons";

class NameSpritesFetcher {
  constructor(
    private readonly apiClient: typeof PokeGraphqlApiClient = pokeGqlApiClient,
    private readonly formIdMapping: PokeApiFormMapping = new PokeApiFormMapping()
  ) {}

  async get(pokemonId: PokemonId): Promise<PokemonNameImage> {
    const speciesId = pokemonId.split("-")[0];
    const formId = pokemonId.split("-")[1];

    const formPokemonIdOpt = this.formIdMapping.getFormPokemonId(pokemonId);
    if (formPokemonIdOpt) {
      const response = await this.apiClient.query<PokemonNameAndSpritesForForm>(
        GET_POKEMON_NAME_AND_SPRITES_FOR_FORM,
        {
          speciesId: speciesId,
          formPokemonId: formPokemonIdOpt,
        }
      );
      return convertToPokemonNameFormImage(response);
    }

    const response = await this.apiClient.query<PokemonNameAndSprites>(
      GET_POKEMON_NAME_AND_SPRITES,
      {
        speciesId: speciesId,
      }
    );
    if (isNotRegister(response)) {
      const data = notRegisteredPokemonNameImages.get(pokemonId);
      if (!data) {
        throw new Error("Not Found: " + pokemonId);
      }
      return data;
    }
    return convertToPokemonNameImage(response);
  }
}

function isNotRegister(json: PokemonNameAndSprites) {
  return json.gen3_species.length === 0;
}

function convertToPokemonNameImage(json: PokemonNameAndSprites) {
  return {
    name: json.gen3_species[0].pokemon_v2_pokemonspeciesnames[0].name,
    imageUrl: extractHomeFrontDefault(
      json.pokemon_v2_pokemonsprites[0].sprites
    ),
  };
}

function convertToPokemonNameFormImage(
  json: PokemonNameAndSpritesForForm
): PokemonNameImage {
  return {
    name: json.gen3_species[0].pokemon_v2_pokemonspeciesnames[0].name,
    formName:
      json.pokemon_v2_pokemonform[0].pokemon_v2_pokemonformnames[0].name,
    imageUrl: extractHomeFrontDefault(
      json.pokemon_v2_pokemonform[0].pokemon_v2_pokemon[0]
        .pokemon_v2_pokemonsprites.sprites
    ),
  };
}

function extractHomeFrontDefault(spritesStr: string): string {
  const sprites: PokemonSprites = JSON.parse(spritesStr);
  return sprites.other.home.front_default!;
}
