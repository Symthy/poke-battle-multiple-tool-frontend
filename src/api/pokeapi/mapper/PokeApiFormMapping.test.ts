import { PokeApiFormMapping } from "./PokeApiFormMapping";

describe("PokeApiFormMapping", () => {
  let pokeApiFormMapping: PokeApiFormMapping;

  beforeEach(() => {
    pokeApiFormMapping = new PokeApiFormMapping();
  });

  it("should get value", () => {
    pokeApiFormMapping = new PokeApiFormMapping();
    expect(pokeApiFormMapping.getFormPokemonId("892-1"));
  });
});
