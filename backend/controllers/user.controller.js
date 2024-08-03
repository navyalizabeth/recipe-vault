import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json({
        success: true,
        user: {
          name: validUser.name,
          email: validUser.email,
          id: validUser._id,
        },
      });
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .status(200)
      .json({ success: true, message: "User has been signed out" });
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};
