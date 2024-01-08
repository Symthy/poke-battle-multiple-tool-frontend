import { PartyCompatibilityTable } from "./PartyCompatibilityTable";
import { IndividualCompatibilityTable } from "./IndividualCompatibilityTable";
import { ADVANTAGE, DISADVANTAGE } from "../containts";

describe("PartyCompatibilityTable", () => {
  let compatibilityTable: PartyCompatibilityTable;

  beforeEach(() => {
    compatibilityTable = new PartyCompatibilityTable();
  });

  it("should add an own pokemon to the table", () => {
    const ownPokemonId = "3-0";
    compatibilityTable.addOwnPokemon(ownPokemonId);
    const ownPokemons = compatibilityTable.displayOrderPokemonIds;
    expect(ownPokemons).toContain(ownPokemonId);
  });

  it("should remove an own pokemon from the table", () => {
    const ownPokemonId = "3-0";
    compatibilityTable.addOwnPokemon(ownPokemonId);
    compatibilityTable.removeOwnPokemon(ownPokemonId);
    const ownPokemons = compatibilityTable.displayOrderPokemonIds;
    expect(ownPokemons).not.toContain(ownPokemonId);
  });

  it("should clear the compatibility table for an own pokemon", () => {
    const ownPokemonId = "3-0";
    compatibilityTable.addOwnPokemon(ownPokemonId);
    compatibilityTable.updateCompatibility(ownPokemonId, "157-1", ADVANTAGE);
    compatibilityTable.clearOwnPokemon(ownPokemonId);
    const compatibility = compatibilityTable.getCompatibility(
      ownPokemonId,
      "157-1"
    );
    expect(compatibility).toBeUndefined();
  });

  it("should update the compatibility between own and target pokemon", () => {
    const ownPokemonId = "3-0";
    const targetPokemonId = "157-1";
    compatibilityTable.addOwnPokemon(ownPokemonId);
    compatibilityTable.updateCompatibility(
      ownPokemonId,
      targetPokemonId,
      ADVANTAGE
    );
    const compatibility = compatibilityTable.getCompatibility(
      ownPokemonId,
      targetPokemonId
    );
    expect(compatibility).toBe(ADVANTAGE);
  });

  it("should swap the order of two own pokemons", () => {
    const ownPokemonId1 = "3-0";
    const ownPokemonId2 = "157-1";
    compatibilityTable.addOwnPokemon(ownPokemonId1);
    compatibilityTable.addOwnPokemon(ownPokemonId2);
    compatibilityTable.swapRecord(1, 2);
    const ownPokemons = compatibilityTable.displayOrderPokemonIds;
    expect(ownPokemons[0]).toBe(ownPokemonId2);
    expect(ownPokemons[1]).toBe(ownPokemonId1);
  });

  it("should convert the compatibility table to JSON", () => {
    const ownPokemonId1 = "3-0";
    const ownPokemonId2 = "157-1";
    compatibilityTable.addOwnPokemon(ownPokemonId1);
    compatibilityTable.addOwnPokemon(ownPokemonId2);
    compatibilityTable.updateCompatibility(ownPokemonId1, "260-0", ADVANTAGE);
    compatibilityTable.updateCompatibility(
      ownPokemonId2,
      "260-0",
      DISADVANTAGE
    );
    const json = compatibilityTable.toJson();
    expect(json).toEqual({
      displayOrderPokemons: [ownPokemonId1, ownPokemonId2],
      party: {
        [ownPokemonId1]: [
          {
            pokemonId: "260-0",
            compatibility: ADVANTAGE,
          },
        ],
        [ownPokemonId2]: [
          {
            pokemonId: "260-0",
            compatibility: DISADVANTAGE,
          },
        ],
      },
    });
  });
});
