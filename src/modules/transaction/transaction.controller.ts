import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";

const service = new TransactionService();

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const transaction = await service.createTransaction({ ...req.body, userId });
    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const transactions = await service.getTransactions(userId);
    res.json(transactions);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(400).json({ message: "Transaction ID is required" });

    await service.deleteTransaction(id);
    res.json({ message: "Deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
  
};


export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(400).json({ message: "Transaction ID is required" });

    const updatedTransaction = await service.updateTransaction(id, req.body);
    res.json(updatedTransaction);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};