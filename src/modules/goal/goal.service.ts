import * as repo from "./goal.repository";

export const createGoal = async (data: any) => {
  return repo.createGoalRepo(data);
};

export const getGoalsByUser = async (userId: string) => {
  return repo.getGoalsByUserRepo(userId);
};

export const updateGoalProgress = async (id: string, amount: number) => {
  return repo.updateGoalProgressRepo(id, amount);
};

export const deleteGoal = async (id: string) => {
  return repo.deleteGoalRepo(id);
};