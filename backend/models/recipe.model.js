import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    steps: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?cs=srgb&dl=pexels-roman-odintsov-4551832.jpg&fm=jpg",
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;