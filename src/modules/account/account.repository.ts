import prisma from "../../config/prisma";

export class AccountRepository {
  async create(data: any) {
    return prisma.account.create({ data });
  }

  async findByUser(userId: string) {
    return prisma.account.findMany({
      where: { userId }
    });
  }

  async updateBalance(accountId: string, amount: number) {
    return prisma.account.update({
      where: { id: accountId },
      data: { balance: amount }
    });
  }
}