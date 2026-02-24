import { Router } from "express";
import * as controller from "./ai.controller";
import { authenticate } from "../../middleware/auth.middleware";
const router = Router();

router.get("/analyze", authenticate, controller.analyze);

export default router;