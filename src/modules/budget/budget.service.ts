import * as repo from "./budget.repository";

export const createBudget = (data: any) =>
  repo.createBudgetRepo(data);

export const getBudgets = (userId: string) =>
  repo.getBudgetsByUserRepo(userId);

export const updateBudget = (id: string, percentage: number) =>
  repo.updateBudgetRepo(id, percentage);

export const deleteBudget = (id: string) =>
  repo.deleteBudgetRepo(id);