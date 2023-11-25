const express = require("express");
const crypto = require("node:crypto");
const notes = require("./notes.json");
const { validateNote, validatePartialNote } = require("./note");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

//GET NOTES - GET NOTES BY CATEGORY
app.get("/notes", (req, res) => {
  const { categorie } = req.query;
  if (categorie) {
    const filteredNotes = notes.filter((note) =>
      note.categories.some((c) => c.toLowerCase() === categorie.toLowerCase())
    );
    return res.json(filteredNotes);
  }

  res.json(notes);
});

//GET NOTES BY ID
app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);
  if (note) {
    return res.json(note);
  } else {
    return res.status(404).json({ message: "no se ha encontrado la nota" });
  }
});

//POST NOTE
app.post("/notes", (req, res) => {
  const result = validateNote(req.body);
  if (!result.success) {
    return res.status(400).json(JSON.parse(result.error.message));
  }
  const newNote = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

//PATCH NOTE
app.patch("/notes/:id", (req, res) => {
  const result = validatePartialNote(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "no se ha encontrado la nota" });
  }
  const { id } = req.params;
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ message: "no se ha encontrado la nota" });
  }
  const updateNote = {
    ...notes[noteIndex],
    updated_at: Date.now(),
    ...result.data,
  };
  notes[noteIndex] = updateNote;
  return res.json(updateNote);
});

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
