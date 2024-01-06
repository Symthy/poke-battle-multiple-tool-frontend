import { RankMatchList, SeasonDetail } from "../../api/homeapi/type";

export class RankMatchListParser {
  private latestSeasonDetails: SeasonDetail[];
  constructor(private rankMatchList: RankMatchList) {
    this.latestSeasonDetails = this.extractLatestSeason(rankMatchList);
  }

  private extractLatestSeason(rankMatchList: RankMatchList): SeasonDetail[] {
    const seasons = Object.keys(rankMatchList.list);
    const latestSeason = Math.max(...seasons.map(Number));
    const seasonDetails = rankMatchList.list[latestSeason.toString()];
    const cIds = Object.keys(seasonDetails);
    return cIds.map((cid) => seasonDetails[cid]);
  }

  getLatestSeasonSinglePathInfo() {
    const latestSeasonSingleRuleDetail = this.latestSeasonDetails.find(
      (season) => season.rule === 0
    )!;
    return {
      cid: latestSeasonSingleRuleDetail.cId,
      rst: latestSeasonSingleRuleDetail.rst,
      ts: latestSeasonSingleRuleDetail.ts2,
    };
  }
}
