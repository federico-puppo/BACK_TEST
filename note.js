import { readJSON } from "./utils.js";
import { randomUUID } from "node:crypto";
const notes = readJSON("./notes.json");

export class NoteModel {
  //GET ALL - FILTERED BY CATEGORY - FILTERES BY ARCHIVED
  static async getAll({ category, archived }) {
    if (category) {
      return notes.filter((note) =>
        note.categories.some((c) => c.toLowerCase() === category.toLowerCase())
      );
    }
    if (archived) {
      const archivedNotes = notes.filter(
        (note) => note.archived.toString() === archived
      );
      return archivedNotes;
    }
    return notes;
  }

  //GET BY ID
  static async getById({ id }) {
    const note = notes.find((note) => note.id === id);
    return note;
  }

  //CREATE
  static async create({ input }) {
    const newNote = {
      id: randomUUID(),
      ...input,
    };
    notes.push(newNote);
  }

  //UPDATE
  static async update({ id, input }) {
    const note = notes.find((note) => note.id === id);
    if (id === -1) return false;
    notes[id] = {
      ...notes[id],
      ...input,
    };
    return note[id];
  }

  //ARCHIVE
  static async archive({ id }) {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) return noteIndex;
    notes[noteIndex].archived = !notes[noteIndex].archived;
    return notes[noteIndex].archived;
  }

  //DELETE
  static async delete({ id }) {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) return false;
    notes.splice(noteIndex, 1);
    return true;
  }
}
