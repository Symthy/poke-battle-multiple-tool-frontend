import { IndividualCompatibilityTable } from "./IndividualCompatibilityTable";
import { ADVANTAGE, DISADVANTAGE } from "../containts";

describe("IndividualCompatibilityTable", () => {
  let compatibilityTable: IndividualCompatibilityTable;

  beforeEach(() => {
    compatibilityTable = new IndividualCompatibilityTable("260-0");
  });

  it("should put and get a record into the table", () => {
    const pokemonId = "3-0";
    compatibilityTable.put(pokemonId, ADVANTAGE);
    expect(compatibilityTable.getRecord("3-0")).toEqual({
      pokemonId: pokemonId,
      compatibility: ADVANTAGE,
    });
  });

  it("should remove a record from the table", () => {
    const pokemonId = "3-0";
    compatibilityTable.put(pokemonId, ADVANTAGE);
    compatibilityTable.removeRecord("3-0");
    const record = compatibilityTable.getRecord("3-0");
    expect(record).toBeUndefined();
  });

  it("should convert the compatibility table to JSON", () => {
    const pokemonId1 = "3-0";
    const pokemonId2 = "157-1";
    compatibilityTable.put(pokemonId1, ADVANTAGE);
    compatibilityTable.put(pokemonId2, DISADVANTAGE);
    const json = compatibilityTable.toJson();
    expect(json).toEqual([
      {
        pokemonId: pokemonId1,
        compatibility: ADVANTAGE,
      },
      {
        pokemonId: pokemonId2,
        compatibility: DISADVANTAGE,
      },
    ]);
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
