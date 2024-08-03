import express from 'express';
import { test, createRecipe, getRecipe, getOneRecipe, searchRecipe } from '../controllers/recipe.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { createRecipeValidation } from '../validators/recipe.validator.js';
import { validateRequest } from '../utils/validateRequest.js';

const router = express.Router();

router.get('/test', test);
router.get('/', verifyToken, getRecipe);
router.get('/:id', verifyToken, getOneRecipe);
router.post('/createRecipe', verifyToken, createRecipeValidation, validateRequest, createRecipe);
router.get('/search', verifyToken, searchRecipe);

export default router;
