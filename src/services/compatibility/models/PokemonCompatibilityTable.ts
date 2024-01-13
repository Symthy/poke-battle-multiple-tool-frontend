import {
  Compatibility,
  CompatibilityRecord,
  CompatibilityJson,
  PokemonCompatibilityTableRecord,
  PokemonId,
} from "@/types/compatibility";

function isPokemonCompatibilityTableRecord(
  arg: any
): arg is PokemonCompatibilityTableRecord {
  return arg && arg.pokemonId && arg.description && arg.compatibilities;
}

function isPokemonId(arg: any): arg is PokemonId {
  return typeof arg === "string";
}

// ポケモン1体に対する相性表
export class PokemonCompatibilityTable {
  private _id?: PokemonId;
  private _description?: string;
  private pokemonIdToCompatibility: Map<PokemonId, Compatibility>;

  constructor();
  constructor(id: PokemonId);
  constructor(recordJson: PokemonCompatibilityTableRecord);
  constructor(arg?: any) {
    this.pokemonIdToCompatibility = new Map();
    if (arg == null) {
      return;
    }
    if (isPokemonId(arg)) {
      this._id = arg;
    }
    if (isPokemonCompatibilityTableRecord(arg)) {
      this._id = arg.pokemonId;
      this._description = arg.description;
      this.restore(arg.compatibilities);
    }
  }

  private restore(records: CompatibilityJson) {
    for (const key in records) {
      const pokemonId = key as PokemonId;
      const compatibility = records[pokemonId];
      this.pokemonIdToCompatibility.set(pokemonId, compatibility);
    }
  }

  put(key: PokemonId, value: Compatibility) {
    this.pokemonIdToCompatibility.set(key, value);
  }

  get(pokemonId: PokemonId): CompatibilityRecord | undefined {
    const compatibility = this.pokemonIdToCompatibility.get(pokemonId);
    if (!compatibility) {
      return;
    }
    return {
      pokemonId: pokemonId,
      compatibility: compatibility,
    };
  }

  remove(id: PokemonId) {
    this.pokemonIdToCompatibility.delete(id);
  }

  clear() {
    this.pokemonIdToCompatibility.clear();
  }

  rowCount(): number {
    return this.pokemonIdToCompatibility.size;
  }

  toJson(): PokemonCompatibilityTableRecord {
    const compatibilities: CompatibilityJson = {};
    this.pokemonIdToCompatibility.forEach((compatibility, pokemonId) => {
      compatibilities[pokemonId] = compatibility;
    });
    return {
      pokemonId: this._id,
      description: this._description,
      compatibilities: compatibilities,
    };
  }
}
