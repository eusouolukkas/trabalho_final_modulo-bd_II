import { DataSource } from "typeorm";
import "dotenv/config";
import config from "./typeorm.config";

export class DataBaseConnection {
  private static _connection: DataSource;

  public static async connect() {
    console.log(process.env.DB_URL);

    if (!this._connection) {
      this._connection = await config.initialize();
    }
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("Database não inicializada!");
    }

    return this._connection;
  }
}
