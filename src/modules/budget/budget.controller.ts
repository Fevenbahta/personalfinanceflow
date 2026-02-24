// src/modules/budget/budget.controller.ts
import { Request, Response, NextFunction } from "express";
import * as service from "./budget.service";
import { BudgetAIService } from "../ai/budget-ai.service";

const aiService = new BudgetAIService();

export const createBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const budget = await service.createBudget({ ...req.body, userId });
    res.status(201).json(budget);
  } catch (err: any) {
    next(err);
  }
};

export const getBudgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const budgets = await service.getBudgets(userId);
    res.json(budgets);
  } catch (err: any) {
    next(err);
  }
};

export const analyze = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const analysis = await aiService.analyzeMonthlyBudget(userId, new Date());
    res.json(analysis);
  } catch (err: any) {
    next(err);
  }
};

export const checkPurchase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const { amount, category } = req.body; // ← Include category
    
    console.log('Purchase check:', { userId, amount, category });
    
    const advice = await aiService.canAffordPurchase(userId, amount, category); // ← Pass category to service
    res.json(advice);
  } catch (err: any) {
    console.error('Purchase check error:', err);
    next(err);
  }
};

 export const deleteBudget = async (req: Request, res: Response) => {
      try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) return res.status(400).json({ message: "Budget ID is required" });
    
        await service.deleteBudget(id);
        res.json({ message: "Deleted" });
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      
    };

export const updateBudget = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(400).json({ message: "Budget ID is required" });
    
    // Extract the percentage from the request body
    const { percentage } = req.body;
    
    if (percentage === undefined) {
      return res.status(400).json({ message: "Percentage is required" });
    }
    
    // Pass just the percentage value, not the whole body
    const updatedBudget = await service.updateBudget(id, percentage);
    res.json(updatedBudget);
  } catch (error: any) {
    console.error("Error updating budget:", error);
    res.status(400).json({ message: error.message });
  }
};