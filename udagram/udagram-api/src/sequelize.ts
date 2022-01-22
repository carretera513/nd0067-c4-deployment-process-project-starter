import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";

export const sequelize = new Sequelize({
  username: config.db_username,
  password: config.db_password,
  database: config.db_database,
  host: config.db_host,
  port: config.db_port,

  dialect: "postgres",
  storage: ":memory:",
});
