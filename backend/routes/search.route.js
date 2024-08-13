import express from "express";
import { searchRecipe } from "../controllers/recipe.controller.js";

const router = express.Router();
router.get("/search", searchRecipe);

export default router;