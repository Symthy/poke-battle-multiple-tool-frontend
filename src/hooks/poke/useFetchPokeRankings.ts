import { pokeHomeApiClient } from "@/api/homeapi/PokemonHomeApiClient";

const useFetchPokeRankings = async () => {
  const latestSeasonDetail = await pokeHomeApiClient.getLatestSeason();
  const rankingList = await pokeHomeApiClient.getPokemonRanking({
    cid: latestSeasonDetail.cId,
    rst: latestSeasonDetail.rst,
    ts: latestSeasonDetail.ts2,
  });
  return rankingList;
};
