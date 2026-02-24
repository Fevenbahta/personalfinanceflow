import * as service from "./notification.service";
import { Request, Response } from "express";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const notification = await service.createNotification({ ...req.body, userId });
    res.status(201).json(notification);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const notifications = await service.getNotifications(userId);
    res.json(notifications);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};