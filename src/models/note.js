import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING()),
  },
});
