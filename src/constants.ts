import path from "path";

// export const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url)); // srcのパスが取れる
const rootDir = path.resolve(__dirname, "..");
export const CONFIG_DIR = path.join(rootDir, "../config");
