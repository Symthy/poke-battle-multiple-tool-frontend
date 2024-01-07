import { PokemonId, PokemonNameImage } from "@/types/compatibility";

// Pokeapi に登録されるまでに時間がかかるため、未登録のポケモンはここで定義する（できれば設定ファイルに外だし）
export const notRegisteredPokemonNameImages = new Map<
  PokemonId,
  PokemonNameImage
>([
  ["1009-0", { name: "ウネルミナモ", imageUrl: "/1009-0.png" }],
  ["1010-0", { name: "テツノイサハ", imageUrl: "/1010-0.png" }],
  ["1018-0", { name: "ブリジュラス", imageUrl: "/1018-0.png" }],
  ["1019-0", { name: "カミツオロチ", imageUrl: "/1019-0.png" }],
  ["1020-0", { name: "ウガツホムラ", imageUrl: "/1020-0.png" }],
  ["1021-0", { name: "タケルライコ", imageUrl: "/1021-0.png" }],
  ["1022-0", { name: "テツノイワオ", imageUrl: "/1022-0.png" }],
  ["1023-0", { name: "テツノカシラ", imageUrl: "/1023-0.png" }],
]);
