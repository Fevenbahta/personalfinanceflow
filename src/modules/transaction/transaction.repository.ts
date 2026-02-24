import prisma from "../../config/prisma";

export class TransactionRepository {
  async create(data: {
    userId: string;
    accountId: string;
    amount: number;
    type: string;
    category?: string;
    description?: string;
    transactionDate?: Date;
  }) {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) throw new Error("User not found");

    // Check if the account exists
    const account = await prisma.account.findUnique({ where: { id: data.accountId } });
    if (!account) throw new Error("Account not found");

    // Create the transaction
    return prisma.transaction.create({
      data: {
        userId: data.userId,
        accountId: data.accountId,
        amount: data.amount,
        type: data.type,
        category: data.category,
        description: data.description,
        transactionDate: data.transactionDate ?? new Date(),
      },
    });
  }

  async findByUser(userId: string) {
    return prisma.transaction.findMany({
      where: { userId },
    });
  }

  async delete(id: string) {
    return prisma.transaction.delete({
      where: { id },
    });
  }
async update(id: string, data: {
    accountId?: string;
    amount?: number;
    type?: string;
    category?: string;
    description?: string;
    transactionDate?: Date;
  }) {
    // Optionally, check if transaction exists first
    const transaction = await prisma.transaction.findUnique({ where: { id } });
    if (!transaction) throw new Error("Transaction not found");

    // If accountId is being updated, verify the account exists
    if (data.accountId) {
      const account = await prisma.account.findUnique({ where: { id: data.accountId } });
      if (!account) throw new Error("Account not found");
    }

    return prisma.transaction.update({
      where: { id },
      data,
    });
  }
}