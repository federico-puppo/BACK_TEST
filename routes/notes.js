import { Router } from "express";
import { NotesController } from "../controllers/notes.js";

export const notesRouter = Router();

//GET NOTE (ALL-CATEGORY-ARCHIVED)
notesRouter.get("/", NotesController.getAll);

//GET NOTE BY ID
notesRouter.get("/:id", NotesController.getById);

//CREATE NOTE
notesRouter.post("/", NotesController.create);

//UPDATE NOTE
notesRouter.patch("/:id", NotesController.update);

//ARCHIVAR-DESARCHIVAR NOTE
notesRouter.patch("/archive/:id", NotesController.archive);

//DELETE NOTE
notesRouter.delete("/:id", NotesController.delete);
