import { Category } from "../models/category.js";
import { validateCategory } from "../schemas/category.js";

export class CategoryController {
  //GET ALL
  static async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //GET BY ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (category) return res.json(category);
      return res.status(404).json({ message: "category not found" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //CREATE
  static async create(req, res) {
    try {
      const result = validateCategory(req.body);
      if (!result.success) {
        return res.status(400).json(JSON.parse(result.error.message));
      }
      const newCategory = await Category.create(result.data);
      res.status(201).json(newCategory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //DELETE
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await Category.destroy({ where: { id: id } });
      return res.status(304).json({ message: "Category deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
