import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

router.use(authMiddleware);

// Get user details (protected)
router.get("/logout", logoutUser);

export default router;
