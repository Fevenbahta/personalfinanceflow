import prisma from "../../config/prisma";

/**
 * Create a new goal
 * @param data - goal data
 */
export const createGoalRepo = (data: {
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount?: number;
  targetDate: string | Date;
}) => {
  // Ensure targetDate is a JS Date object
  const targetDate = typeof data.targetDate === "string" ? new Date(data.targetDate) : data.targetDate;

  return prisma.goal.create({
    data: {
      userId: data.userId,
      title: data.title,
      targetAmount: data.targetAmount,
      currentAmount: data.currentAmount ?? 0, // default to 0 if missing
      targetDate,
    },
  });
};

/**
 * Get all goals for a specific user
 * @param userId - ID of the user
 */
export const getGoalsByUserRepo = (userId: string) =>
  prisma.goal.findMany({
    where: { userId },
    orderBy: { targetDate: "asc" }, // optional: sort by targetDate
  });

/**
 * Increment the currentAmount of a goal
 * @param id - goal ID
 * @param amount - amount to add to currentAmount
 */
export const updateGoalProgressRepo = (id: string, amount: number) =>
  prisma.goal.update({
    where: { id },
    data: { currentAmount: { increment: amount } },
  });

/**
 * Delete a goal by ID
 * @param id - goal ID
 */
export const deleteGoalRepo = (id: string) =>
  prisma.goal.delete({ where: { id } });

/**
 * Optionally: get a single goal by ID
 * @param id - goal ID
 */
export const getGoalByIdRepo = (id: string) =>
  prisma.goal.findUnique({ where: { id } });