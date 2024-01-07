import { fileURLToPath } from "url";
import path from "path";

export const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const CONFIG_DIR = path.join(ROOT_DIR, "config");