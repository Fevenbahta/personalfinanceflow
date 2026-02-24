import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utiles/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Authentication token required" });

  const token = authHeader.split(" ")[1]; // Expect Bearer <token>
  try {
    const payload = verifyToken(token);
    (req as any).userId = payload.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};