import { gql } from "graphql-tag";

export const GET_POKEMON_NAME_AND_SPRITES = gql`
  query getPokemonNameSprites($speciesId: Int!) {
    gen3_species: pokemon_v2_pokemonspecies(
      where: { id: { _eq: $speciesId } }
    ) {
      pokemon_v2_pokemonspeciesnames(
        where: { pokemon_v2_language: { name: { _eq: "ja" } } }
      ) {
        pokemon_species_id
        name
      }
    }
    pokemon_v2_pokemonsprites(where: { pokemon_id: { _eq: $speciesId } }) {
      pokemon_id
      sprites
    }
  }
`;

export type PokemonNameAndSprites = {
  gen3_species: {
    pokemon_v2_pokemonspeciesnames: {
      pokemon_species_id: number;
      name: string;
    }[];
  }[];
  pokemon_v2_pokemonsprites: {
    pokemon_id: number;
    sprites: string;
  }[];
};

export const GET_POKEMON_NAME_AND_SPRITES_FOR_FORM = gql`
  query getPokemonNameSpritesForForm($speciesId: Int, $formPokemonId: Int) {
    gen3_species: pokemon_v2_pokemonspecies(
      where: { id: { _eq: $speciesId } }
    ) {
      id
      pokemon_v2_pokemonspeciesnames(
        where: { pokemon_v2_language: { name: { _eq: "ja" } } }
      ) {
        name
      }
    }
    pokemon_v2_pokemonform(where: { pokemon_id: { _eq: $formPokemonId } }) {
      pokemon_id
      pokemon_v2_pokemonformnames(
        where: { pokemon_v2_language: { name: { _eq: "ja" } } }
      ) {
        name
      }
      pokemon_v2_pokemon {
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
      is_battle_only
    }
  }
`;

export type PokemonNameAndSpritesForForm = {
  gen3_species: {
    id: number;
    pokemon_v2_pokemonspeciesnames: {
      name: string;
    }[];
  }[];
  pokemon_v2_pokemonform: {
    pokemon_id: number;
    pokemon_v2_pokemon: {
      pokemon_v2_pokemonsprites: {
        sprites: string;
      };
    }[];
    pokemon_v2_pokemonformnames: {
      name: string;
    }[];
    is_battle_only: boolean;
  }[];
};

export type PokemonSprites = {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  versions: {
    "generation-i": {
      "red-blue": {
        front_default: string | null;
        front_gray: string | null;
        back_default: string | null;
        back_gray: string | null;
        front_transparent: string | null;
        back_transparent: string | null;
      };
      yellow: {
        front_default: string | null;
        front_gray: string | null;
        back_default: string | null;
        back_gray: string | null;
        front_transparent: string | null;
        back_transparent: string | null;
      };
    };
    "generation-ii": {
      crystal: {
        front_default: string | null;
        front_shiny: string | null;
        back_default: string | null;
        back_shiny: string | null;
        front_transparent: string | null;
        front_shiny_transparent: string | null;
        back_transparent: string | null;
        back_shiny_transparent: string | null;
      };
      gold: {
        front_default: string | null;
        front_shiny: string | null;
        back_default: string | null;
        back_shiny: string | null;
        front_transparent: string | null;
      };
      silver: {
        front_default: string | null;
        front_shiny: string | null;
        back_default: string | null;
        back_shiny: string | null;
        front_transparent: string | null;
      };
    };
    "generation-iii": {
      emerald: {
        front_default: string | null;
        front_shiny: string | null;
      };
      "firered-leafgreen": {
        front_default: string | null;
        front_shiny: string | null;
        back_default: string | null;
        back_shiny: string | null;
      };
      "ruby-sapphire": {
        front_default: string | null;
        front_shiny: string | null;
        back_default: string | null;
        back_shiny: string | null;
      };
    };
    "generation-iv": {
      "diamond-pearl": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
      };
      "heartgold-soulsilver": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
      };
      platinum: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
      };
    };
    "generation-v": {
      "black-white": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        animated: {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
        };
      };
    };
    "generation-vi": {
      "omegaruby-alphasapphire": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "x-y": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-vii": {
      "ultra-sun-ultra-moon": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
    };
    "generation-viii": {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
    };
  };
};
