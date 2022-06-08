import path from "path";
import { fileURLToPath } from "url";

export const __dirname = path.resolve(fileURLToPath(import.meta.url));
export const front = path.resolve(__dirname, '../../../front');