// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";

// In-memory token store (replace with DB/Redis in production)
const VALID_TOKENS: Record<string, string> = {};

// Simple function to generate a random token
const generateRandomToken = () => Math.random().toString(36).substr(2, 16);

export const generateToken = (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Generate a new token
  const token = generateRandomToken();

  // Save token -> userId mapping
  VALID_TOKENS[token] = userId;

  res.json({ token, userId });
};

// For debugging: list all valid tokens
export const listTokens = (_req: Request, res: Response) => {
  res.json(VALID_TOKENS);
};

export default { generateToken, listTokens };