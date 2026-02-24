import prisma from "../../config/prisma";
import { TransactionRepository } from "./transaction.repository";

export class TransactionService {
  private repo = new TransactionRepository();

  async createTransaction(data: any) {
    const transaction = await this.repo.create(data);

    if (data.type === "income") {
      await prisma.account.update({
        where: { id: data.accountId },
        data: { balance: { increment: data.amount } }
      });
    }

    if (data.type === "expense") {
      await prisma.account.update({
        where: { id: data.accountId },
        data: { balance: { decrement: data.amount } }
      });
    }

    return transaction;
  }

  async getTransactions(userId: string) {
    return this.repo.findByUser(userId);
  }

  async deleteTransaction(id: string) {
    return this.repo.delete(id);
  }
    async updateTransaction(id: string, data: any) {
    return this.repo.update(id, data);
  }
}