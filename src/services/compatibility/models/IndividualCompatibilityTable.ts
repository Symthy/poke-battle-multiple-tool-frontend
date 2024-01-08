import {
  Compatibility,
  CompatibilityRecord,
  CompatibilityRecordJson,
  PokemonId,
} from "@/types/compatibility";

export class IndividualCompatibilityTable {
  private pokemonIdToCompatibility: Map<PokemonId, Compatibility>;
  constructor(
    private readonly ownPokemonId: PokemonId,
    recordsJson?: CompatibilityRecordJson[]
  ) {
    this.pokemonIdToCompatibility = new Map();
    if (recordsJson) {
      this.restore(recordsJson);
    }
  }

  private restore(recordsJson: CompatibilityRecordJson[]) {
    for (const record of recordsJson) {
      if (record.compatibility) {
        this.pokemonIdToCompatibility.set(
          record.pokemonId,
          record.compatibility
        );
      }
    }
  }

  put(key: PokemonId, value: Compatibility) {
    this.pokemonIdToCompatibility.set(key, value);
  }

  getRecord(pokemonId: PokemonId): CompatibilityRecord | undefined {
    const compatibility = this.pokemonIdToCompatibility.get(pokemonId);
    if (!compatibility) {
      return;
    }
    return {
      pokemonId: pokemonId,
      compatibility: compatibility,
    };
  }

  rowCount(): number {
    return this.pokemonIdToCompatibility.size;
  }

  removeRecord(pokemonId: PokemonId) {
    this.pokemonIdToCompatibility.delete(pokemonId);
  }

  clear(): void {
    this.pokemonIdToCompatibility.clear();
  }

  toJson(): CompatibilityRecordJson[] {
    return Array.from(this.pokemonIdToCompatibility.entries()).map((entry) => {
      const pokemonId = entry[0];
      const compatibility = entry[1];
      return {
        pokemonId: pokemonId,
        compatibility: compatibility,
      };
    });
  }
}
