import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(),
    },
  },
  { timestamps: false }
);
async function createCategories(){
  console.log("creando categorias");
  await Category.create("Chores");
  await Category.build("Learning");
  await Category.build("Shallow Work");
  await Category.build("Deep Work");
  await Category.build("Body Care");
  await Category.build("Proyect");
  await Category.build("Next Week");
}

createCategories()

