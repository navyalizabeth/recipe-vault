import { useState } from "react";
import {
  TextInput,
  Button,
  Textarea,
  Alert,
  Spinner,
  Label,
} from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createRecipeStart,
  createRecipeSuccess,
  createRecipeFailure,
} from "../../redux/recipe/recipeSlice";

export default function CreateRecipe() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [{ value: "" }],
    steps: [{ value: "" }],
    image: "",
    isPrivate: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked, dataset } = e.target;
    if (dataset.index !== undefined) {
      const index = Number(dataset.index);
      setFormData((prevState) => ({
        ...prevState,
        [id]: prevState[id].map((item, i) =>
          i === index ? { ...item, value } : item
        ),
      }));
    } else {
      setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
    }
  };

  const handleAddField = (type) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: [...prevState[type], { value: "" }],
    }));
  };

  const handleRemoveField = (type, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      formData.ingredients.some((i) => !i.value) ||
      formData.steps.some((s) => !s.value) ||
      !formData.image
    ) {
      return setErrorMessage("Please fill out all required fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      dispatch(createRecipeStart());
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/recipes/create`, {
        ...formData,
        ingredients: formData.ingredients.map((i) => i.value),
        steps: formData.steps.map((s) => s.value),
      });
      if (res.data.success === false) {
        setErrorMessage(res.data.message);
      }
      dispatch(createRecipeSuccess(res.data));
      setLoading(false);
      if (res.status === 201) {
        navigate("/recipes");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      dispatch(
        createRecipeFailure(error.response?.data?.message || error.message)
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create a New Recipe
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            id="name"
            placeholder="Recipe Name"
            onChange={handleChange}
            required
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4"
          />
          <div>
            <Label className="block text-gray-700 my-8">Ingredients</Label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  id="ingredients"
                  data-index={index}
                  value={ingredient.value}
                  onChange={handleChange}
                  placeholder="Ingredient"
                  className="flex-1 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveField("ingredients", index)}
                  gradientMonochrome="failure"
                  className="ml-4"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => handleAddField("ingredients")}
              gradientMonochrome="success"
              className="w-full"
            >
              Add New Ingredient
            </Button>
          </div>
          <div>
            <Label className="block text-gray-700 mb-2">
              Preparation Steps
            </Label>
            {formData.steps.map((step, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  id="steps"
                  data-index={index}
                  value={step.value}
                  onChange={handleChange}
                  placeholder="Step"
                  className="flex-1 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveField("steps", index)}
                  gradientMonochrome="failure"
                  className="ml-4"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => handleAddField("steps")}
              gradientMonochrome="success"
              className="w-full"
            >
              Add Next Step
            </Button>
          </div>
          <div className="">
            <Label className="block text-gray-700 mb-2">
              Image of the Recipe
            </Label>
            <input
              id="image"
              placeholder="Image URL"
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4"
            />
          </div>

          {/* <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <Label
              htmlFor="isPrivate"
              className="ml-2 block text-sm text-gray-700"
            >
              Make the Recipe Private
            </Label>
          </div> */}
          <Button
            type="submit"
            className="w-full font-semibold rounded-lg"
            gradientDuoTone="purpleToBlue"
            disabled={loading}
            outline
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Creating...</span>
              </>
            ) : (
              "Create Recipe"
            )}
          </Button>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}