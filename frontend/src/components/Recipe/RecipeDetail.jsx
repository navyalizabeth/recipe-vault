import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaListOl, FaUser, FaUtensils } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (error) {
        setErrorMessage(
         "Recipe Not Found!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16 text-red-600">
        {errorMessage}
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16 text-gray-600">
        Recipe not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md my-12 pt-16">
      <h2 className="text-3xl font-semibold mb-6 text-center">{recipe.name}</h2>

      <div className="flex justify-center mb-6">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full max-w-md h-auto object-cover rounded-md"
        />
      </div>

      <div className="mb-6">
        <p className="text-lg text-gray-700 mt-1 flex items-center">
          <FaUser className="mr-2 text-gray-600" />
          {recipe.user?.name || "Unknown"}
        </p>
        <p className="text-lg text-gray-700 mt-1 flex items-center">
          <MdOutlineMailOutline className="mr-2 text-gray-600" />
          {recipe.user?.email || "Unknown"}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaUtensils className="mr-2 text-green-500" />
          Ingredients
        </h3>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="mb-1 flex items-center">
              <FaUtensils className="mr-2 text-green-300" />
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaListOl className="mr-2 text-blue-500" />
          Steps
        </h3>
        <ol className="list-decimal pl-6">
          {recipe.steps.map((step, index) => (
            <li key={index} className="mb-1">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        {recipe.isPrivate ? "Private Recipe" : "Public Recipe"}
      </p>
    </div>
  );
}