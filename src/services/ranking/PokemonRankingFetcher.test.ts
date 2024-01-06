import { PokemonRankingFetcher } from "./PokemonRankingFetcher";
import { PokemonHomeApiClient } from "@/api/homeapi/PokemonHomeApiClient";
import * as fs from "fs";
import { PokemonRankingList, RankMatchList } from "@/api/homeapi/type";

describe("PokemonRankingFetcher", () => {
  let pokemonRankingFetcher: PokemonRankingFetcher;
  let apiClientMock: PokemonHomeApiClient;
  let rankMatchListResponse: RankMatchList;
  let pokemonRankingResponse: PokemonRankingList;

  beforeAll(() => {
    rankMatchListResponse = JSON.parse(
      fs.readFileSync("tests/data/rank_match_list_response.json", "utf-8")
    );
    pokemonRankingResponse = JSON.parse(
      fs.readFileSync("tests/data/pokemon_ranking_top10.json", "utf-8")
    );
  });

  beforeEach(() => {
    apiClientMock = new PokemonHomeApiClient();
    pokemonRankingFetcher = new PokemonRankingFetcher(apiClientMock);
  });

  it("should call the API client methods and return the converted Pokemon IDs", async () => {
    apiClientMock.getRankMatchList = jest
      .fn()
      .mockResolvedValue(rankMatchListResponse);
    apiClientMock.getPokemonRanking = jest
      .fn()
      .mockResolvedValue(pokemonRankingResponse);

    const result = await pokemonRankingFetcher.call();

    expect(apiClientMock.getRankMatchList).toHaveBeenCalled();
    expect(apiClientMock.getPokemonRanking).toHaveBeenCalledWith({
      cid: "qjmfrrbqwcn6flojqjvm",
      rst: 0,
      ts: 1704495636,
    });
    expect(result).toEqual(
      expect.arrayContaining([
        "987-0",
        "149-0",
        "1017-0",
        "1000-0",
        "892-1",
        "233-0",
        "1002-0",
        "901-1",
        "212-0",
        "381-0",
      ])
    );
  });
});
