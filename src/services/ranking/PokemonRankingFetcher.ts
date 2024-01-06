import { PokemonId } from "@/types/compatibility";
import { PokemonHomeApiClient } from "../../api/homeapi/PokemonHomeApiClient";
import { RankMatchListParser } from "./RankMatchListParser";
import { PokemonRankingList } from "@/api/homeapi/type";

export class PokemonRankingFetcher {
  constructor(
    private apiClient: PokemonHomeApiClient = new PokemonHomeApiClient()
  ) {}
  async call(): Promise<PokemonId[]> {
    const rankMatchList = await this.apiClient.getRankMatchList();
    const season = new RankMatchListParser(
      rankMatchList
    ).getLatestSeasonSinglePathInfo();
    const pokemonRankings = await this.apiClient.getPokemonRanking(season);
    return convertToPokemonIds(pokemonRankings);
  }
}

function convertToPokemonIds(rankingList: PokemonRankingList): PokemonId[] {
  return rankingList.map((pokemon) => `${pokemon.id}-${pokemon.form}`);
}
