import { Request, Response, NextFunction } from "express";
import { analyzeUserFinances } from "./ai.service";

export const analyze = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const insight = await analyzeUserFinances(userId);
    res.json({ insight });
  } catch (err: any) {
    next(err);
  }
};