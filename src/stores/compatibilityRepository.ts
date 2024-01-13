import {
  PartyCompatibilityTableRecord,
  PokemonCompatibilityTableRecord,
} from "@/types/compatibility";

export interface CompatibilityRepository {
  savePokemonCompatibility(record: PokemonCompatibilityTableRecord): void;
  savePartyCompatibility(record: PartyCompatibilityTableRecord): void;
}
