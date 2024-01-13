import { PokeBattleIndexedDB } from "@/lib/indexeddb";
import {
  PartyCompatibilityTableRecord,
  PokemonCompatibilityTableRecord,
  PokemonId,
} from "@/types/compatibility";
import { CompatibilityRepository } from "../compatibilityRepository";

export class CompatibilityStore implements CompatibilityRepository {
  constructor(private readonly _db: PokeBattleIndexedDB) {}

  savePokemonCompatibility(record: PokemonCompatibilityTableRecord): void {
    this._db
      .transaction("rw", this._db.parties, () => {
        this._db.pokemonCompatibilities.put({
          pokemonId: record.pokemonId,
          description: record.description ?? "",
          jsonData: record.compatibilities,
        });
      })
      .catch((err) => console.error(err));
  }

  async findByPokemonId(
    pokemonId: PokemonId
  ): Promise<PokemonCompatibilityTableRecord | void> {
    return await this._db
      .transaction("r", this._db.pokemonCompatibilities, () =>
        this._db.pokemonCompatibilities.where({ pokemonId: pokemonId }).first()
      )
      .then((record) => {
        if (!record) {
          return;
        }
        return {
          pokemonId: record.pokemonId,
          description: record.description,
          compatibilities: record.jsonData,
        };
      })
      .catch((err) => console.error(err));
  }

  savePartyCompatibility(record: PartyCompatibilityTableRecord): void {
    const memberNum = record.partyMembers.length;
    const party = {
      id: record.partyId,
      pokemonId1: record.partyMembers[0],
      pokemonId2: memberNum >= 2 ? record.partyMembers[1] : undefined,
      pokemonId3: memberNum >= 3 ? record.partyMembers[2] : undefined,
      pokemonId4: memberNum >= 4 ? record.partyMembers[3] : undefined,
      pokemonId5: memberNum >= 5 ? record.partyMembers[4] : undefined,
      pokemonId6: memberNum >= 6 ? record.partyMembers[5] : undefined,
    };
    const jsonData = {
      opponentPokemons: record.orderOpponentPokemons,
    };

    this._db
      .transaction(
        "rw",
        this._db.pokemonCompatibilities,
        this._db.partyCompatibilities,
        this._db.parties,
        () =>
          Promise.all([
            this._db.parties.put(party).then((id) => {
              this._db.partyCompatibilities.put({
                partyId: id,
                jsonData: jsonData,
              });
            }),
            (() => {
              const data = Object.keys(this._db.partyCompatibilities).map(
                (key) => {
                  const ownPokemonId = key as PokemonId;
                  return {
                    pokemonId: ownPokemonId,
                    description:
                      record.compatibilities[ownPokemonId].description,
                    jsonData: record.compatibilities[ownPokemonId],
                  };
                }
              );
              this._db.pokemonCompatibilities.bulkPut(data);
            })(),
          ])
      )
      .catch((err) => console.error(err));
  }

  async findByPartyId(
    partyId: number
  ): Promise<PartyCompatibilityTableRecord | void> {
    return this._db
      .transaction(
        "r",
        this._db.partyCompatibilities,
        this._db.pokemonCompatibilities,
        this._db.parties,
        () => {
          const res = this._db.partyCompatibilities
            .where({ partyId: partyId })
            .first()
            .then(async (record) => {
              if (!record) {
                return;
              }
              const partyMembers = await this._db.parties
                .where({ partyId: record.partyId })
                .first()
                .then((record) => {
                  if (!record) {
                    return [];
                  }
                  return [
                    record.pokemonId1,
                    record.pokemonId2,
                    record.pokemonId3,
                    record.pokemonId4,
                    record.pokemonId5,
                    record.pokemonId6,
                  ].filter((r) => r !== undefined) as PokemonId[];
                });
              const compatibilities = await this._db.pokemonCompatibilities
                .where("pokemonId")
                .equals(record.jsonData.opponentPokemons)
                .toArray()
                .then((records) => {
                  return records.map((record) => {
                    return {
                      pokemonId: record.pokemonId,
                      description: record.description,
                      compatibilities: record.jsonData,
                    };
                  });
                });

              return {
                partyId: record.partyId,
                orderOpponentPokemons: record.jsonData.opponentPokemons,
                partyMembers: partyMembers,
                compatibilities: compatibilities,
              };
            });
        }
      )
      .catch((err) => console.error(err));
  }
}
