import { PokeApiFormMapping } from "./PokeApiFormMapping";

describe("PokeApiFormMapping", () => {
  let pokeApiFormMapping: PokeApiFormMapping;

  beforeEach(() => {
    pokeApiFormMapping = new PokeApiFormMapping();
  });

  it("should load mappings from YAML file", () => {
    pokeApiFormMapping = new PokeApiFormMapping();
    expect(pokeApiFormMapping.getFormPokemonId("892-1"));
  });
});
