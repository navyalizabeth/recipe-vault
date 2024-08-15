import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import RecipeList from "../components/Recipe/RecipeList";
import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
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
        const res = await api.get(`/api/recipes/public`);
        setRecipes(res.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setErrorMessage("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecipes();
  }, [currentUser]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      {currentUser ? (
        <div className="max-w-4xl mx-auto mt-16 p-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            Find Your Favorite Recipe
          </h2>
          <RecipeList recipes={recipes} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen m-0">
          <h2 className="text-4xl font-bold text-center mb-6">
            Welcome to Recipe Book
          </h2>
          <p className="text-center text-lg mb-4">
            Get started by creating an account or logging in!
          </p>
          <Link to="/login">
            <Button className="w-full" gradientDuoTone="purpleToBlue" outline>
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}