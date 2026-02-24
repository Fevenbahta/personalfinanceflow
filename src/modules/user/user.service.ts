import { UserRepository } from "./user.repository";
import { generateToken } from "../../utiles/jwt";

export class UserService {
  private userRepo = new UserRepository();

  async createUser(data: any) {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new Error("User already exists");

    const user = await this.userRepo.create(data);

    // Generate token on registration
    const token = generateToken(user.id);

    return { user, token };
  }

  async loginUser(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    // Generate token on login
    const token = generateToken(user.id);

    return { user, token };
  }

  async getUser(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }
}