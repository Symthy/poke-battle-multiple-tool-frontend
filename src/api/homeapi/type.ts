export type SeasonPath = {
  cid: string;
  rst: number;
  ts: number;
};

export type SeasonDetail = {
  cId: string;
  rst: number;
  ts2: number;
  [key: string]: string | number;
};
export type RankMatchList = {
  code: number;
  detail: number;
  list: {
    [season: string]: {
      [id: string]: SeasonDetail;
    };
  };
};
export type PokemonRankingList = Array<{ id: number; form: number }>;
