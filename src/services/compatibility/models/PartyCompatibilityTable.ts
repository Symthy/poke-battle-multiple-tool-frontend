import {
  Compatibility,
  PartyCompatibilityRecordsJson,
  PokemonId,
} from "@/types/compatibility";
import { IndividualCompatibilityTable } from "./IndividualCompatibilityTable";

export class PartyCompatibilityTable {
  private _displayOrderPokemonIds: PokemonId[];
  private _ownPokemonToCompatibilityTable: Map<
    PokemonId,
    IndividualCompatibilityTable
  >;
  constructor(recordsJson?: PartyCompatibilityRecordsJson) {
    this._displayOrderPokemonIds = [];
    this._ownPokemonToCompatibilityTable = new Map();
    if (recordsJson) {
      this.restore(recordsJson);
    }
  }

  private restore(recordsJson: PartyCompatibilityRecordsJson) {
    for (const ownPokemonId of recordsJson.displayOrderPokemons) {
      this.displayOrderPokemonIds.push(ownPokemonId);
      const ownPokemonRecordsJson = recordsJson.party[ownPokemonId];
      const ownPokemonTable = new IndividualCompatibilityTable(
        ownPokemonId,
        ownPokemonRecordsJson
      );
      this._ownPokemonToCompatibilityTable.set(ownPokemonId, ownPokemonTable);
    }
  }

  get displayOrderPokemonIds(): PokemonId[] {
    return this._displayOrderPokemonIds;
  }

  addOwnPokemon(ownPokemonId: PokemonId): void {
    this.displayOrderPokemonIds.push(ownPokemonId);
    this._ownPokemonToCompatibilityTable.set(
      ownPokemonId,
      new IndividualCompatibilityTable(ownPokemonId)
    );
  }

  removeOwnPokemon(ownPokemonId: PokemonId): void {
    const index = this.displayOrderPokemonIds.indexOf(ownPokemonId);
    this.displayOrderPokemonIds.splice(index, 1);
    this._ownPokemonToCompatibilityTable.delete(ownPokemonId);
  }

  clearOwnPokemon(ownPokemonId: PokemonId): void {
    const record = this._ownPokemonToCompatibilityTable.get(ownPokemonId);
    if (record) {
      record.clear();
    }
  }

  updateCompatibility(
    ownPokemonId: PokemonId,
    targetPokemonId: PokemonId,
    compatibility: Compatibility
  ): void {
    const ownPokemonTable =
      this._ownPokemonToCompatibilityTable.get(ownPokemonId);
    if (ownPokemonTable) {
      ownPokemonTable.put(targetPokemonId, compatibility);
    }
  }

  getCompatibility(
    ownPokemonId: PokemonId,
    targetPokemonId: PokemonId
  ): Compatibility | undefined {
    const ownPokemonTable =
      this._ownPokemonToCompatibilityTable.get(ownPokemonId);
    if (ownPokemonTable) {
      const record = ownPokemonTable.getRecord(targetPokemonId);
      if (record) {
        return record.compatibility;
      }
    }
  }

  swapRecord(order1: number, order2: number) {
    const pokemonId1 = this.displayOrderPokemonIds[order1 - 1];
    const pokemonId2 = this.displayOrderPokemonIds[order2 - 1];
    this.displayOrderPokemonIds[order1 - 1] = pokemonId2;
    this.displayOrderPokemonIds[order2 - 1] = pokemonId1;
  }

  toJson() {
    const recordsJson: PartyCompatibilityRecordsJson = {
      displayOrderPokemons: this.displayOrderPokemonIds,
      party: {},
    };
    for (const ownPokemonId of this.displayOrderPokemonIds) {
      const ownPokemonTable =
        this._ownPokemonToCompatibilityTable.get(ownPokemonId);
      if (ownPokemonTable) {
        recordsJson.party[ownPokemonId] = ownPokemonTable.toJson();
      }
    }
    return recordsJson;
  }
}
