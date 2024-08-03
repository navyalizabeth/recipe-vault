import express from "express";
import {
  createRecipe,
  getPublicRecipes,
  getMyRecipes,
  getOneRecipe,
} from "../controllers/recipe.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { createRecipeValidation } from "../validators/recipe.validator.js";
import { validateRequest } from "../utils/validateRequest.js";

const router = express.Router();

router.get("/public", getPublicRecipes);
router.get("/", verifyToken, getMyRecipes);
router.get("/:id", verifyToken, getOneRecipe);
router.post(
  "/create",
  verifyToken,
  createRecipeValidation,
  validateRequest,
  createRecipe
);

export default router;
