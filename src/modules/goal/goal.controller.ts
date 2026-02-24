import { Request, Response, NextFunction } from "express";
import * as service from "./goal.service";

export const createGoal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const goal = await service.createGoal({ ...req.body, userId });
    res.status(201).json(goal);
  } catch (err: any) {
    next(err);
  }
};

export const getGoals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const goals = await service.getGoalsByUser(userId);
    res.json(goals);
  } catch (err: any) {
    next(err);
  }
};

export const updateGoal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(400).json({ message: "Goal ID is required" });

    const amount = Number(req.body.amount);
    if (isNaN(amount)) return res.status(400).json({ message: "Amount must be a number" });

    const updated = await service.updateGoalProgress(id, amount);
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

export const deleteGoal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(400).json({ message: "Goal ID is required" });

    await service.deleteGoal(id);
    res.json({ message: "Goal deleted" });
  } catch (err: any) {
    next(err);
  }
};