import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import recipeRoutes from "./routes/recipe.route.js";
import searchRoutes from "./routes/search.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prodOrigin = [process.env.FRONTEND_URL];
const devOrigin = ['http://localhost:5173'];
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not Allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error Connecting to database", error);
  });

app.use("/api/user", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/searchrecipes", searchRoutes);
app.get('/', (req, res) => {
  res.send('Recipe Vault API is running');
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
