import 'cross-fetch/polyfill';
import { renderHook } from "@testing-library/react";
import { useFetchPokeNameSprites } from "./useFetchPokeNameSprites";

describe("PokeNameSpritesFetcher", () => {

  it("should fetch Pokemon name and image for a given PokemonId", async () => {
    const pokemonId = "3-0";
    const { result } =  renderHook(() => useFetchPokeNameSprites(pokemonId));
    const { name, imageUrl } = await result.current;
    expect(name).toBe("フシギバナ");
    expect(imageUrl).toBeDefined();
  });

  it("should throw an error for a non-existent PokemonId", async () => {
    const pokemonId = "10000-1";
    expect(() => renderHook(() => useFetchPokeNameSprites(pokemonId)).result.current).rejects.toThrow("Not Found: " + pokemonId)
  });
});