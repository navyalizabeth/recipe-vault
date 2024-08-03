import { Link } from "react-router-dom";

export default function RecipeList({ recipes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
            <Link
              to={`/recipe/${recipe._id}`}
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg text-center w-full"
            >
              View Full Recipe
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
