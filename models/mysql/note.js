import {connection} from "../../db/database.js";

export class NoteModel {
  // Get all notes filtered by category and archived status
  static async getAll({ category, archived }) {
    const [rows] = await connection.query(
      "SELECT *, BIN_TO_UUID(id) id FROM notes;"
    );
    return rows;
  }

  // Other methods for getById, create, update, archive, delete...
  //GET BY ID
  static async getById({ id }) {
    const [notes] = await connection.query(
      `SELECT *, BIN_TO_UUID(id) id FROM notes WHERE id = UUID_TO_BIN(?);`,
      [id]
    );
    if (notes.length === 0) return null
    return notes[0];
  }

  //CREATE
  static async create({ input }) {}

  //UPDATE
  static async update({ id, input }) {}

  //ARCHIVE
  static async archive({ id }) {}

  //DELETE
  static async delete({ id }) {}
}
