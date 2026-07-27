import express from "express";

import { registerUser, loginUser, getProfile } from "../controllers/authController.js";

const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
