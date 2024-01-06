import { PokemonRankingList, RankMatchList, SeasonPath } from "./type";

export class PokemonHomeApiClient {
  private svRankMatchListUrl: string;
  private svPokemonRankingBaseUrl: string;
  constructor() {
    this.svRankMatchListUrl =
      "https://api.battle.pokemon-home.com/tt/cbd/competition/rankmatch/list";
    this.svPokemonRankingBaseUrl =
      "https://resource.pokemon-home.com/battledata/ranking/scvi";
  }

  async getRankMatchList(): Promise<RankMatchList> {
    const response = await fetch(this.svRankMatchListUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/javascript, */*; q=0.01",
        Authorization: "Bearer",
        langcode: "1",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Mobile Safari/537.36",
      },
      body: JSON.stringify({
        soft: "Sc",
      }),
    });
    const json = await response.json();
    return json;
  }

  async getPokemonRanking({
    cid,
    rst,
    ts,
  }: SeasonPath): Promise<PokemonRankingList> {
    const url = `${this.svPokemonRankingBaseUrl}/${cid}/${rst}/${ts}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
}
