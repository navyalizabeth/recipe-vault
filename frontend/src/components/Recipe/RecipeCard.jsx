import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-xl font-semibold">{recipe.name}</h3>
      <p className="text-sm">{recipe.ingredients}</p>
      <Link to={`/recipes/${recipe._id}`} className="text-blue-600">
        View Details
      </Link>
    </div>
  );
}