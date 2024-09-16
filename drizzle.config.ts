import { defineConfig } from "drizzle-kit";
import config from "@/lib/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: config.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
});