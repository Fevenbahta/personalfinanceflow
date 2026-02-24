import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "./transaction.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Create a new transaction
router.post("/",  authenticate, createTransaction);

// Get all transactions for a user
// Example URL: /transactions/user/123
router.get("/user/:userId", authenticate, getTransactions);

// Delete a transaction by ID
// Example URL: /transactions/123
router.delete("/:id", authenticate, deleteTransaction);
// Update a transaction by ID
// Example URL: /transactions/123
router.put("/:id", authenticate, updateTransaction);
export default router;