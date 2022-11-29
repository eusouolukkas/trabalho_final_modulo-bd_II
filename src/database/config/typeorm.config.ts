import { DataSource } from "typeorm";
import "dotenv/config";

const config = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: ["src/database/entites/**/*ts"],
  migrations: ["src/database/migrations/**/*.ts"],
});

export default config;
