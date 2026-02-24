import express from "express";
import cors from "cors";
import userRoutes from "./modules/user/user.routes";
import accountRoutes from "./modules/account/account.route";
import transactionRoutes from "./modules/transaction/transaction.route";
import goalRoutes from "./modules/goal/goal.route";
import budgetRoutes from "./modules/budget/budget.route";
import notificationRoutes from "./modules/notification/notification.route";
import aiRoutes from "./modules/ai/ai.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;