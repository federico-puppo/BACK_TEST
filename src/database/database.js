import Sequelize from "sequelize";

const localConfig = {
  database: "notesdb",
  username: "postgres",
  password: "mysecretpassword",
  host: "localhost",
  dialect: "postgres",
};

export const sequelize = new Sequelize(process.env.DATABASE_URL || localConfig);
