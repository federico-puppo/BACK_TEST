import { Router } from "express";
import { CategoryController } from "../controllers/category.js";

export const categoryRouter = Router();

//GET ALL CATEGORIES
categoryRouter.get("/", CategoryController.getAll);

//GET CATEGORY BY ID
categoryRouter.get("/:id", CategoryController.getById);

//CREATE CATEGORY
categoryRouter.post("/", CategoryController.create);

//DELETE CATEGORY
categoryRouter.delete("/:id", CategoryController.delete);