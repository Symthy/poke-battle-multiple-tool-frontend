import { pokeApiFormMapping } from "./PokeApiFormMapping";

describe("PokeApiFormMapping", () => {
  it("should get value", () => {
    expect(pokeApiFormMapping.getFormPokemonId("892-1"));
  });
});
