import express, { json } from "express";
import { notesRouter } from "./routes/notes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(json());

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
