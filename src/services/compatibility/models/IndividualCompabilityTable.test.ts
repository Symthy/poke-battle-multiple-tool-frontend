import { CompatibilityTable } from "./IndividualCompabilityTable";
import { ADVANTAGE, DISADVANTAGE } from "../containts";

describe("IndividualCompatibilityTable", () => {
  let compatibilityTable: CompatibilityTable;

  beforeEach(() => {
    compatibilityTable = new CompatibilityTable();
  });

  it("should put and get a record into the table", () => {
    const pokemonId = "3-0";
    compatibilityTable.put(pokemonId, ADVANTAGE);
    expect(compatibilityTable.getRecord(1)).toEqual({
      pokemonId: pokemonId,
      compatibility: ADVANTAGE,
    });
  });

  it("should remove a record from the table", () => {
    const pokemonId = "3-0";
    compatibilityTable.put(pokemonId, ADVANTAGE);
    compatibilityTable.removeRecord(1);
    const record = compatibilityTable.getRecord(1);
    expect(record).toBeUndefined();
  });

  it("should swap two records in the table", () => {
    const pokemonId1 = "3-0";
    const pokemonId2 = "157-1";
    compatibilityTable.put(pokemonId1, ADVANTAGE);
    compatibilityTable.put(pokemonId2, DISADVANTAGE);
    compatibilityTable.swapRecord(1, 2);
    expect(compatibilityTable.getRecord(1)).toEqual({
      pokemonId: pokemonId2,
      compatibility: DISADVANTAGE,
    });
    expect(compatibilityTable.getRecord(2)).toEqual({
      pokemonId: pokemonId1,
      compatibility: ADVANTAGE,
    });
  });

  it("should merge two compatibility tables", () => {
    const otherCompatibilityTable2 = new CompatibilityTable();
    const pokemonId1 = "3-0";
    const pokemonId2 = "157-1";
    compatibilityTable.put(pokemonId1, ADVANTAGE);
    otherCompatibilityTable2.put(pokemonId2, DISADVANTAGE);
    compatibilityTable.merge(otherCompatibilityTable2);
    expect(compatibilityTable.getRecord(1)).toEqual({
      pokemonId: pokemonId1,
      compatibility: ADVANTAGE,
    });
    expect(compatibilityTable.getRecord(2)).toEqual({
      pokemonId: pokemonId2,
      compatibility: DISADVANTAGE,
    });
  });

  it("should convert the compatibility table to JSON", () => {
    const pokemonId1 = "3-0";
    const pokemonId2 = "157-1";
    compatibilityTable.put(pokemonId1, ADVANTAGE);
    compatibilityTable.put(pokemonId2, DISADVANTAGE);
    const json = compatibilityTable.toJson();
    expect(json).toEqual([
      {
        displayOrder: 1,
        pokemonId: pokemonId1,
        compatibility: ADVANTAGE,
      },
      {
        displayOrder: 2,
        pokemonId: pokemonId2,
        compatibility: DISADVANTAGE,
      },
    ]);
  });
});
