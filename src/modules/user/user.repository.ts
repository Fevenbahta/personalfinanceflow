import prisma from "../../config/prisma";

export class UserRepository {
  // ✅ Create a user safely
  async create(data: { username: string; email: string; monthlyIncome?: number }) {
    return prisma.user.create({
      data: {
        username: data.username,                        // required
        email: data.email,                              // required
        monthlyIncome: data.monthlyIncome ?? 0,        // optional, defaults to 0
      },
    });
  }

  // ✅ Find by ID with accounts and goals included
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
        goals: true,
        transactions: true,     // optional: include more relations if needed
        budgets: true,
        notifications: true,
        aiInsights: true,
      },
    });
  }

  // ✅ Find by email
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}