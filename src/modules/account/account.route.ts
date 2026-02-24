import express from "express";
import * as controller from "./account.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = express.Router();

// Protect all routes with token authentication
router.post("/", authenticate, controller.createAccount);
router.get("/user/:userId", authenticate, controller.getAccounts);

export default router;