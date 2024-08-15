import { useEffect, useState } from "react";
import { Spinner, Alert } from "flowbite-react";
import RecipeList from "../components/Recipe/RecipeList";
import CreateRecipe from "../components/Recipe/CreateRecipe";
import axios from "axios";

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/recipes`);
        setErrorMessage(null);
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setErrorMessage(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecipes();
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      {errorMessage && (
        <Alert color="failure" className="mb-6">
          {errorMessage}
        </Alert>
      )}

      {recipes.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            My Recipes
          </h2>
          <RecipeList recipes={recipes} />
        </>
      ) : (
        <>
          <div className="text-center text-gray-600">
            <p className="text-lg font-semibold mb-4">No recipes found!</p>
            <p className="text-md">
              Start creating and sharing your unique recipes.
            </p>
          </div>
          <CreateRecipe />
        </>
      )}
    </div>
  );
}