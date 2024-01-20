import { readFileSync, writeFileSync } from "fs";
import * as yaml from "js-yaml";
import Mustache from "mustache";
import path from "path";
import { fileURLToPath } from "url";

type PokemonId = `${number}-${number}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadYaml<T>(ymlPath: string): T {
  return yaml.load(readFileSync(ymlPath, "utf8")) as T;
}

function convertYamlToJson<T>(ymlPath: string): T {
  const jsonObject = loadYaml<T>(ymlPath);
  return jsonObject as T;
}

export function writeTsFile(ymlPath: string, outPath: string) {
  const yamlContents = convertYamlToJson<{
    mapping: [{ [k: PokemonId]: number }];
  }>(ymlPath);

  const mappings = [];
  for (const obj of yamlContents.mapping) {
    const pokeId = Object.keys(obj)[0] as PokemonId;
    const value = obj[pokeId];
    mappings.push({ key: pokeId, value: value });
  }

  const template: string = readFileSync(
    path.join(__dirname, "../mustache/mapping.mustache"),
    "utf-8"
  );

  writeFileSync(
    outPath,
    Mustache.render(template, {
      constName: "POKEAPI_FORM_MAPPING",
      mappings: mappings,
    })
  );
}
