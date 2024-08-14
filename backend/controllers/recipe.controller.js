import Recipe from "../models/recipe.model.js";
import { errorHandler } from "../utils/error.js";
import { validationResult } from "express-validator";

export const createRecipe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errorHandler(400, "Invalid data"));
  }

  try {
    const { name, ingredients, steps, image, isPrivate } = req.body;
    const recipe = new Recipe({
      name,
      ingredients,
      steps,
      image,
      isPrivate,
      user: req.user._id,
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const getPublicRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ isPrivate: false }).populate(
      "user",
      "name email"
    );
    res.status(200).json(recipes);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    res.status(200).json(recipes);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const getOneRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate("user", "name email");
    if (!recipe) {
      return next(errorHandler(404, "Recipe Not Found"));
    }
    if (
      recipe.isPrivate &&
      recipe.user._id.toString() !== req.user._id.toString()
    ) {
      return next(errorHandler(403, "Access Denied"));
    }
    res.status(200).json(recipe);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const searchRecipe = async (req, res, next) => {
  try {
    const search = req.query.q || "";
    if (!search || typeof search !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid search query" });
    }

    const query = {
      isPrivate: false,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { ingredients: { $elemMatch: { $regex: search, $options: "i" } } },
      ],
    };

    const recipes = await Recipe.find(query).populate("user", "name email");
    res.status(200).json(recipes);
  } catch (error) {
    next(errorHandler(400, "Error searching recipes: " + error.message));
  }
};