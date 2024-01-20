import { fileURLToPath } from "url";
import path from "path";
import { writeTsFile } from "./yml_to_ts_converter.js";

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(ROOT_DIR, "../../../config");
const MAPPING_YML_PATH = path.join(CONFIG_PATH, "pokeapi_form_mapping.yml");
const OUT_MAPPING_TS_PATH = path.join(
  ROOT_DIR,
  "../../../src/api/pokeapi/mapper/data/PokeApiFormMappingJson.ts"
);

writeTsFile(MAPPING_YML_PATH, OUT_MAPPING_TS_PATH);
