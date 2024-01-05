import { CompatibilityTable } from "./CompabilityTable";
import { ADVANTAGE, DISADVANTAGE } from "./containts";

describe("CompatibilityTable", () => {
  let compatibilityTable: CompatibilityTable;

  beforeEach(() => {
    compatibilityTable = new CompatibilityTable();
  });

  it("should put and get a record into the table", () => {
    const pokemonId = "Pikachu";
    compatibilityTable.put(pokemonId, ADVANTAGE);
    expect(compatibilityTable.getRecord(1)).toEqual({
      pokemonId: pokemonId,
      compatibility: ADVANTAGE,
    });
  });

  it("should remove a record from the table", () => {
    const pokemonId = "Pikachu";
    compatibilityTable.put(pokemonId, ADVANTAGE);
    compatibilityTable.removeRecord(1);
    const record = compatibilityTable.getRecord(1);
    expect(record).toBeUndefined();
  });

  it("should swap two records in the table", () => {
    const pokemonId1 = "Pikachu";
    const pokemonId2 = "Charizard";
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
    const compatibilityTable1 = new CompatibilityTable();
    const compatibilityTable2 = new CompatibilityTable();
    const pokemonId1 = "Pikachu";
    const pokemonId2 = "Charizard";
    compatibilityTable1.put(pokemonId1, ADVANTAGE);
    compatibilityTable2.put(pokemonId2, DISADVANTAGE);
    compatibilityTable.merge(compatibilityTable2);
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
    const pokemonId1 = "Pikachu";
    const pokemonId2 = "Charizard";
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
