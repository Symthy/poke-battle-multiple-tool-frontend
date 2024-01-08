import { load } from "js-yaml";
import { readFileSync } from "fs";

export function loadYaml<T>(ymlPath: string): T {
  return load(readFileSync(ymlPath, "utf8")) as T;
}
