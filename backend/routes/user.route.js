import express from "express";
import { login, signup, signout } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", signout);

export default router;