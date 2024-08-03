import { body } from "express-validator";

export const createRecipeValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("ingredients").isArray().withMessage("Ingredients should be an array"),
  body("steps").isArray().withMessage("Steps should be an array"),
  body("image").optional().isURL().withMessage("Image must be a valid URL"),
];
