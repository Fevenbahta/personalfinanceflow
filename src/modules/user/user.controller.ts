import { Request, Response } from "express";
import { UserService } from "./user.service";

const service = new UserService();

// Register user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { user, token } = await service.createUser(req.body);
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Login user by email (no password)
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const { user, token } = await service.loginUser(email);
    res.json({ user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get user info
export const getUser = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(400).json({ message: "User ID is required" });

    const user = await service.getUser(id);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};