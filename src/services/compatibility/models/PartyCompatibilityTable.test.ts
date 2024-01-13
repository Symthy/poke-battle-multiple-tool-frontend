import { PartyCompatibilityTable } from "./PartyCompatibilityTable";
import { ADVANTAGE, DISADVANTAGE } from "../contains";

describe("PartyCompatibilityTable", () => {
  let compatibilityTable: PartyCompatibilityTable;

  beforeEach(() => {
    compatibilityTable = new PartyCompatibilityTable();
  });

  it("should add an own pokemon to the table", () => {
    const ownPokemonId = "3-0";
    compatibilityTable.addOwnPokemon(ownPokemonId);
    const ownPokemons = compatibilityTable.partyMembers;
    expect(ownPokemons).toContain(ownPokemonId);
  });

  it("should remove an own pokemon from the table", () => {
    const ownPokemonId = "3-0";
    compatibilityTable.addOwnPokemon(ownPokemonId);
    compatibilityTable.removeOwnPokemon(ownPokemonId);
    const ownPokemons = compatibilityTable.partyMembers;
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

  it("should swap the order of two own pokemons in the party", () => {
    const ownPokemonId1 = "3-0";
    const ownPokemonId2 = "157-1";
    compatibilityTable.addOwnPokemon(ownPokemonId1);
    compatibilityTable.addOwnPokemon(ownPokemonId2);
    compatibilityTable.swapOrderParty(1, 2);
    const ownPokemons = compatibilityTable.partyMembers;
    expect(ownPokemons[0]).toBe(ownPokemonId2);
    expect(ownPokemons[1]).toBe(ownPokemonId1);
  });

  it("should swap the order of two opponent pokemons", () => {
    const opponentPokemonId1 = "6-0";
    const opponentPokemonId2 = "160-0";
    compatibilityTable.addOwnPokemon("3-0");
    compatibilityTable.updateCompatibility(
      "3-0",
      opponentPokemonId1,
      ADVANTAGE
    );
    compatibilityTable.updateCompatibility(
      "3-0",
      opponentPokemonId2,
      DISADVANTAGE
    );
    compatibilityTable.swapOrderOpponent(1, 2);
    const opponentPokemons = compatibilityTable.displayOrderPokemonIds;
    expect(opponentPokemons[0]).toBe(opponentPokemonId2);
    expect(opponentPokemons[1]).toBe(opponentPokemonId1);
  });

  it("should convert the compatibility table to JSON", () => {
    const ownPokemonId1 = "3-0";
    const ownPokemonId2 = "157-1";
    compatibilityTable.addOwnPokemon(ownPokemonId1);
    compatibilityTable.addOwnPokemon(ownPokemonId2);
    compatibilityTable.updateCompatibility(ownPokemonId1, "6-0", ADVANTAGE);
    compatibilityTable.updateCompatibility(
      ownPokemonId2,
      "160-0",
      DISADVANTAGE
    );
    const json = compatibilityTable.toJson();
    expect(json).toEqual({
      partyId: undefined,
      partyMembers: ["3-0", "157-1"],
      orderOpponentPokemons: ["6-0", "160-0"],
      compatibilities: {
        "157-1": {
          compatibilities: {
            "160-0": "Disadvantages",
          },
          description: undefined,
          pokemonId: "157-1",
        },
        "3-0": {
          compatibilities: {
            "6-0": "Advantages",
          },
          description: undefined,
          pokemonId: "3-0",
        },
      },
    });
  });
});
