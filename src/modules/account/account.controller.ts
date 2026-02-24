import { Request, Response, NextFunction } from "express";
import { AccountService } from "./account.service";

const service = new AccountService();

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId; // from token
    const account = await service.createAccount({ ...req.body, userId });
    res.status(201).json(account);
  } catch (err: any) {
    next(err);
  }
};

export const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const accounts = await service.getAccounts(userId);
    res.json(accounts);
  } catch (err: any) {
    next(err);
  }
};