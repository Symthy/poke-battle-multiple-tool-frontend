import { PokemonNameList } from "./PokemonNameList";

describe("PokemonNameList", () => {
  let pokemonNameList: PokemonNameList;

  beforeEach(() => {
    pokemonNameList = new PokemonNameList();
  });

  it("should resolve name by id", () => {
    const name = pokemonNameList.resolveName("3-0");
    expect(name).toBe("フシギバナ");
  });

  it("should return undefined for non-existent id", () => {
    const name = pokemonNameList.resolveName("10000-1");
    expect(name).toBeUndefined();
  });

  it("should return an array of names", () => {
    const names = pokemonNameList.getNames();
    expect(names.length).toBeGreaterThan(0);
  });
});
