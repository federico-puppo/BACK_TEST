import { Note } from "../models/note.js";
import { Category } from "../models/category.js";

import { Op } from "sequelize";
import { validateNote, validatePartialNote } from "../schemas/note.js";

export class NotesController {
  //GET ALL - BY STATE - BY CATEGORY
  static async getAll(req, res) {
    try {
      const { archived, category } = req.query;
      if (archived) {
        console.log("busqueda por estado" + archived);
        const notes = await Note.findAll({ where: { archived: archived } });
        res.json(notes);
      } else if (category) {
        const notes = await Note.findAll({
          where: {
            categories: {
              [Op.contains]: [category],
            },
          },
        });
        res.json(notes);
      } else {
        console.log("busqueda por defecto");
        const notes = await Note.findAll();
        res.json(notes);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //GET BY ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const note = await Note.findByPk(id);
      if (note) return res.json(note);
      return res.status(404).json({ message: "note not found" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //GET NOTE CATEGORIES
  static async getCategories(req, res) {
    try {
      const { id } = req.params;
      const categories = await Category.findAll({ where: { NoteId: id } });
      if (!categories)
        return res.status(404).json({ message: "category not found" });
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //CREATE
  static async create(req, res) {
    try {
      const result = validateNote(req.body);
      if (!result.success) {
        return res.status(400).json(JSON.parse(result.error.message));
      }
      const newNote = await Note.create(result.data);
      res.status(201).json(newNote);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //UPDATE
  static async update(req, res) {
    try {
      const result = validatePartialNote(req.body);
      if (!result.success) {
        return res.status(400).json({ message: result.error.message });
      }
      const { id } = req.params;
      const note = await Note.findByPk(id);
      if (!note) return res.status(404).json({ message: "note not found" });
      const noteUpdated = await note.update(result.data);
      return res.json(noteUpdated);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //ARCHIVE
  static async archive(req, res) {
    try {
      const { id } = req.params;
      const note = await Note.findByPk(id);
      if (!note) return res.status(404).json({ message: "note not found" });
      await note.update({ archived: !note.archived });
      const noteArchived = note.archived;
      if (noteArchived) {
        return res.json({ message: "la nota se ha archivado" });
      } else {
        return res.json({ message: "la nota se ha desarchivado" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //DELETE
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await Note.destroy({ where: { id: id } });
      return res.status(304).json({ message: "Note deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
