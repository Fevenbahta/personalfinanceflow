import { Router } from "express";
import { createUser, getUser, loginUser } from "./user.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", createUser);     // register new user
router.post("/login", loginUser);         // login user by email
router.get("/:id", authenticate, getUser); // get user info (protected)

export default router;