
// src/modules/budget/budget.repository.ts
import prisma from "../../config/prisma";
import { startOfMonth } from "date-fns";

export const createBudgetRepo = async (data: {
  userId: string;
  category: string;
  percentage: number;
  recommendedPercentage?: number | null;
  aiAdjusted?: boolean;
}) => {
  const currentMonth = startOfMonth(new Date());
  
  console.log("Creating budget with data:", {
    ...data,
    month: currentMonth
  });

  try {
    // First, ensure a MonthlyBudget exists for this user and month
    const monthlyBudget = await prisma.monthlyBudget.upsert({
      where: {
        userId_month: {
          userId: data.userId,
          month: currentMonth
        }
      },
      update: {}, // Don't update anything if it exists
      create: {
        userId: data.userId,
        month: currentMonth,
        totalIncome: 0,
        totalExpenses: 0,
        netSavings: 0
      }
    });

    console.log("Monthly budget ensured:", monthlyBudget);

    // Now create the budget allocation
    const budget = await prisma.budgetAllocation.create({
      data: {
        userId: data.userId,
        month: currentMonth,
        category: data.category,
        percentage: data.percentage,
        recommendedPercentage: data.recommendedPercentage ?? null,
        aiAdjusted: data.aiAdjusted ?? false,
      },
    });

    console.log("Budget created:", budget);
    return budget;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
};


export const getBudgetsByUserRepo = (userId: string) =>
  prisma.budgetAllocation.findMany({ where: { userId } });

export const updateBudgetRepo = (id: string, percentage: number) =>
  prisma.budgetAllocation.update({
    where: { id },
    data: { percentage },
  });

export const deleteBudgetRepo = (id: string) =>
  prisma.budgetAllocation.delete({ where: { id } });