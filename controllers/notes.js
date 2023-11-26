import { NoteModel } from "../models/note.js";
import { validateNote, validatePartialNote } from "../schemas/note.js";

export class NotesController {
  //GET ALL
  static async getAll(req, res) {
    const { category, archived } = req.query;
    const notes = await NoteModel.getAll({ category, archived });
    res.json(notes);
  }
  //GET BY ID
  static async getById(req, res) {
    const { id } = req.params;
    const note = await NoteModel.getById({ id });
    if (note) return res.json(note);
    return res.status(404).json({ message: "no se ha encontrado la nota" });
  }
  //CREATE
  static async create(req, res) {
    const result = validateNote(req.body);
    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }
    const newNote = await NoteModel.create({ input: result.data });
    res.status(201).json(newNote);
  }
  //UPDATE
  static async update(req, res) {
    const result = validatePartialNote(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "no se ha encontrado la nota" });
    }
    const { id } = req.params;
    const updatedNote = await NoteModel.update({ id, input: result.data });
    return res.json(updatedNote);
  }
  //ARCHIVE
  static async archive(req, res) {
    const { id } = req.params;
    const noteArchived = await NoteModel.archive({ id });
    if (noteArchived === -1) {
      return res.status(404).json({ message: "no se ha encontrado la nota" });
    }
    if (noteArchived) {
      return res.json({ message: "la nota se ha archivado" });
    } else {
      return res.json({ message: "la nota se ha desarchivado" });
    }
  }
  //DELETE
  static async delete(req, res) {
    const { id } = req.params;
    const result = await NoteModel.delete({ id });
    if (result === false) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.json({ message: "Note deleted" });
  }
}
