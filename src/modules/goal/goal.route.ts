import { Router } from "express";
import * as controller from "./goal.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, controller.createGoal);
router.get("/user/:userId", authenticate, controller.getGoals);
router.patch("/:id", authenticate, controller.updateGoal);
router.delete("/:id", authenticate, controller.deleteGoal);

export default router;