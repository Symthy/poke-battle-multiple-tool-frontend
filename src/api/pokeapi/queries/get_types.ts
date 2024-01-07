import { gql } from "graphql-tag";

export const GET_POKEMON_TYPES = gql`
  query GetTypesQuery {
    pokemon_v2_languagename(where: { name: { _eq: "Japanese" } }) {
      name
      id
      pokemon_v2_language {
        pokemon_v2_typenames {
          name
          id
          type_id
        }
      }
    }
  }
`;
