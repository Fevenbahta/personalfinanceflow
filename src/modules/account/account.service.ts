import { AccountRepository } from "./account.repository";

export class AccountService {
  private repo = new AccountRepository();

  async createAccount(data: any) {
    return this.repo.create(data);
  }

  async getAccounts(userId: string) {
    return this.repo.findByUser(userId);
  }
}