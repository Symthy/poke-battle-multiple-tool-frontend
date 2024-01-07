import {
  Compatibility,
  CompatibilityRecord,
  CompatibilityRecordJson,
  PokemonId,
} from "@/types/compatibility";

export class CompatibilityTable {
  private pokemonIds: PokemonId[];
  private pokemonIdToCompatibility: Map<PokemonId, Compatibility>;
  constructor(recordsJson?: CompatibilityRecordJson[]) {
    this.pokemonIds = [];
    this.pokemonIdToCompatibility = new Map();
    if (recordsJson) {
      this.restore(recordsJson);
    }
  }

  private restore(recordsJson: CompatibilityRecordJson[]) {
    this.pokemonIds = new Array<PokemonId>(recordsJson.length);
    for (const record of recordsJson) {
      if (record.compatibility) {
        const order = record.displayOrder;
        this.pokemonIds[order - 1] = record.pokemonId;
        this.pokemonIdToCompatibility.set(
          record.pokemonId,
          record.compatibility
        );
      }
    }
  }

  put(key: PokemonId, value: Compatibility) {
    if (this.pokemonIds.indexOf(key) === -1) {
      this.pokemonIds.push(key);
    }
    this.pokemonIdToCompatibility.set(key, value);
  }

  getRecord(order: number): CompatibilityRecord | undefined {
    if (this.rowCount() < order) {
      return;
    }
    const index = order - 1;
    const pokemonId = this.pokemonIds[index];
    return {
      pokemonId: pokemonId,
      compatibility: this.pokemonIdToCompatibility.get(pokemonId),
    };
  }

  rowCount(): number {
    return this.pokemonIds.length;
  }

  removeRecord(order: number) {
    if (this.rowCount() < order) {
      return;
    }
    const index = order - 1;
    const pokemonId = this.pokemonIds[index];
    this.pokemonIds.splice(index, 1);
    this.pokemonIdToCompatibility.delete(pokemonId);
  }

  swapRecord(order1: number, order2: number) {
    const pokemonId1 = this.pokemonIds[order1 - 1];
    const pokemonId2 = this.pokemonIds[order2 - 1];
    this.pokemonIds[order1 - 1] = pokemonId2;
    this.pokemonIds[order2 - 1] = pokemonId1;
  }

  merge(other: CompatibilityTable) {
    for (let i = 0; i < other.pokemonIds.length; i++) {
      const pokemonId = other.pokemonIds[i];
      const compatibility = other.pokemonIdToCompatibility.get(pokemonId);
      if (compatibility) {
        if (!this.pokemonIdToCompatibility.has(pokemonId)) {
          this.pokemonIds.push(pokemonId);
        }
        this.pokemonIdToCompatibility.set(pokemonId, compatibility);
      }
    }
  }

  toJson(): CompatibilityRecordJson[] {
    return this.pokemonIds.map((pokemonId, index) => ({
      displayOrder: index + 1,
      pokemonId: pokemonId,
      compatibility: this.pokemonIdToCompatibility.get(pokemonId),
    }));
  }
}
