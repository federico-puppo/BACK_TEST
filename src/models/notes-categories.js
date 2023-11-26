import { Category } from "./category.js";
import { Note } from "./note.js";

Note.belongsToMany(Category, { through: "CategoryNotes", timestamps: false });
Category.belongsToMany(Note, { through: "CategoryNotes", timestamps: false });
