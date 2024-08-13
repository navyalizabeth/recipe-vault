import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  currentRecipe: null,
  error: null,
  loading: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    fetchRecipesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecipesSuccess: (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
    },
    fetchRecipesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRecipeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecipeSuccess: (state, action) => {
      state.currentRecipe = action.payload;
      state.loading = false;
    },
    fetchRecipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createRecipeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRecipeSuccess: (state, action) => {
      state.recipes.push(action.payload);
      state.loading = false;
    },
    createRecipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRecipesStart,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  fetchRecipeStart,
  fetchRecipeSuccess,
  fetchRecipeFailure,
  createRecipeStart,
  createRecipeSuccess,
  createRecipeFailure,
} = recipeSlice.actions;

export default recipeSlice.reducer;