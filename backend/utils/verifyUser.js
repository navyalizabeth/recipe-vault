import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  console.log("Cookies:", req.cookies);
  let token =
    req.cookies.access_token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(errorHandler(403, "Invalid token"));
  }
};