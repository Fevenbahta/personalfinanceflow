// routes/budget.routes.ts
import { Router } from "express";
import * as controller from "./budget.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, controller.createBudget);
router.get("/", authenticate, controller.getBudgets);
router.get("/user/:userId", authenticate, controller.getBudgets);
router.get("/analyze", authenticate, controller.analyze);
router.post("/check-purchase", authenticate, controller.checkPurchase);
router.delete("/:id", authenticate, controller.deleteBudget); // Add this line
router.put("/:id", authenticate, controller.updateBudget); // Add this line
export default router;