import {
  Compatibility,
  PartyCompatibilityTableRecord,
  PokemonId,
} from "@/types/compatibility";
import { PokemonCompatibilityTable } from "./PokemonCompatibilityTable";

export class PartyCompatibilityTable {
  private _partyId?: number;
  private _displayOrderPokemonIds: PokemonId[];
  private _partyMembers: PokemonId[];
  private _ownPokemonToCompatibilityTable: Map<
    PokemonId,
    PokemonCompatibilityTable
  >;
  constructor(partyCompatibilityRecord?: PartyCompatibilityTableRecord) {
    this._displayOrderPokemonIds = [];
    this._ownPokemonToCompatibilityTable = new Map();
    this._partyMembers = [];
    if (partyCompatibilityRecord) {
      this.restore(partyCompatibilityRecord);
    }
  }

  private restore(partyCompatibilityRecord: PartyCompatibilityTableRecord) {
    this._partyId = partyCompatibilityRecord.partyId;
    this._displayOrderPokemonIds =
      partyCompatibilityRecord.orderOpponentPokemons;
    this._partyMembers = partyCompatibilityRecord.partyMembers;
    for (const key in partyCompatibilityRecord.compatibilities) {
      const ownPokemonId = key as PokemonId;
      const ownPokemonCompatibility =
        partyCompatibilityRecord.compatibilities[ownPokemonId];
      const ownPokemonTable = new PokemonCompatibilityTable(
        ownPokemonCompatibility
      );
      this._ownPokemonToCompatibilityTable.set(ownPokemonId, ownPokemonTable);
    }
  }

  get displayOrderPokemonIds(): PokemonId[] {
    return this._displayOrderPokemonIds;
  }

  get partyMembers(): PokemonId[] {
    return this._partyMembers;
  }

  addOwnPokemon(ownPokemonId: PokemonId): void {
    this._partyMembers.push(ownPokemonId);
    this._ownPokemonToCompatibilityTable.set(
      ownPokemonId,
      new PokemonCompatibilityTable(ownPokemonId)
    );
  }

  removeOwnPokemon(ownPokemonId: PokemonId): void {
    const index = this._partyMembers.indexOf(ownPokemonId);
    this._partyMembers.splice(index, 1);
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
    opponentPokemonId: PokemonId,
    compatibility: Compatibility
  ): void {
    if (this._displayOrderPokemonIds.indexOf(opponentPokemonId) === -1) {
      this._displayOrderPokemonIds.push(opponentPokemonId);
    }
    const ownPokemonTable =
      this._ownPokemonToCompatibilityTable.get(ownPokemonId);
    if (ownPokemonTable) {
      ownPokemonTable.put(opponentPokemonId, compatibility);
    }
  }

  getCompatibility(
    ownPokemonId: PokemonId,
    targetPokemonId: PokemonId
  ): Compatibility | undefined {
    const ownPokemonTable =
      this._ownPokemonToCompatibilityTable.get(ownPokemonId);
    if (ownPokemonTable) {
      const record = ownPokemonTable.get(targetPokemonId);
      if (record) {
        return record.compatibility;
      }
    }
  }

  swapOrderParty(order1: number, order2: number) {
    const pokemonId1 = this._partyMembers[order1 - 1];
    const pokemonId2 = this._partyMembers[order2 - 1];
    this._partyMembers[order1 - 1] = pokemonId2;
    this._partyMembers[order2 - 1] = pokemonId1;
  }

  swapOrderOpponent(order1: number, order2: number) {
    const pokemonId1 = this._displayOrderPokemonIds[order1 - 1];
    const pokemonId2 = this._displayOrderPokemonIds[order2 - 1];
    this._displayOrderPokemonIds[order1 - 1] = pokemonId2;
    this._displayOrderPokemonIds[order2 - 1] = pokemonId1;
  }

  toJson(): PartyCompatibilityTableRecord {
    const recordJson: PartyCompatibilityTableRecord = {
      partyId: this._partyId,
      orderOpponentPokemons: this.displayOrderPokemonIds,
      partyMembers: this._partyMembers,
      compatibilities: {},
    };
    for (const ownPokemonId of this._partyMembers) {
      const ownPokemonTable =
        this._ownPokemonToCompatibilityTable.get(ownPokemonId);
      if (ownPokemonTable) {
        recordJson.compatibilities[ownPokemonId] = ownPokemonTable.toJson();
      }
    }
    return recordJson;
  }
}
