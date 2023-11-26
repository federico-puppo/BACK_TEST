import express, { json } from "express";
import cors from "cors";
import { notesRouter } from "./src/routes/notes.js";
import { sequelize } from "./src/database/database.js";
import "./src/models/category.js";
import "./src/models/note.js";
import "./src/models/notes-categories.js";



try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  await sequelize.sync({force: true})
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(json());
  app.use(cors());

  app.use("/notes", notesRouter);

  app.get("/", (req, res) => {
    res.send("Hola mundo");
  });

  app.use((req, res) => {
    res.status(404).send("404 - Not Found");
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
