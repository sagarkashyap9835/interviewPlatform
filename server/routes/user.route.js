// routes/user.route.js
import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

// Protected route to get the current logged-in user
userRouter.get("/current-user", isAuth, getCurrentUser);

export default userRouter;