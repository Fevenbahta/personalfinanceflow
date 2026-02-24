import { Router } from "express";
import * as controller from "./notification.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, controller.createNotification);
router.get("/user/:userId", authenticate, controller.getNotifications);

export default router;