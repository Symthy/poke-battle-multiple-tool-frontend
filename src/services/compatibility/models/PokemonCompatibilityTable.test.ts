import { PokemonCompatibilityTable } from "./PokemonCompatibilityTable";
import { ADVANTAGE, DISADVANTAGE } from "../contains";

describe("PokemonCompatibilityTable", () => {
  let compatibilityTable: PokemonCompatibilityTable;

  beforeEach(() => {
    compatibilityTable = new PokemonCompatibilityTable("260-0");
  });

  it("should put and get a record into the table", () => {
    const pokemonId = "3-0";
    compatibilityTable.put(pokemonId, ADVANTAGE);
    expect(compatibilityTable.get(pokemonId)).toEqual({
      pokemonId: pokemonId,
      compatibility: ADVANTAGE,
    });
  });

  it("should remove a record from the table", () => {
    const pokemonId = "3-0";
    compatibilityTable.put(pokemonId, ADVANTAGE);
    compatibilityTable.remove(pokemonId);
    const record = compatibilityTable.get(pokemonId);
    expect(record).toBeUndefined();
  });

  it("should convert the compatibility table to JSON", () => {
    const pokemonId1 = "3-0";
    const pokemonId2 = "157-1";
    compatibilityTable.put(pokemonId1, ADVANTAGE);
    compatibilityTable.put(pokemonId2, DISADVANTAGE);
    const json = compatibilityTable.toJson();
    expect(json).toEqual({
      pokemonId: "260-0",
      compatibilities: { "157-1": "Disadvantages", "3-0": "Advantages" },
    });
  });

  it("should return the correct number of records in the table", () => {
    const pokemonId1 = "3-0";
    const pokemonId2 = "157-1";
    compatibilityTable.put(pokemonId1, ADVANTAGE);
    compatibilityTable.put(pokemonId2, DISADVANTAGE);
    const recordCount = compatibilityTable.rowCount();
    expect(recordCount).toBe(2);
  });

  it("should clear all records in the table", () => {
    const pokemonId1 = "3-0";
    const pokemonId2 = "157-1";
    compatibilityTable.put(pokemonId1, ADVANTAGE);
    compatibilityTable.put(pokemonId2, DISADVANTAGE);
    compatibilityTable.clear();
    const recordCount = compatibilityTable.rowCount();
    expect(recordCount).toBe(0);
  });
});
