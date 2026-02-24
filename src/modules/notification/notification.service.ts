import * as repo from "./notification.repository";
import { sendEmail } from "../../utiles/email";

export const createNotification = async (data: any) => {
  const notification = await repo.createNotificationRepo(data);

  // Email trigger example
  if (data.email) {
    await sendEmail(
      data.email,
      "FinanceFlow Alert",
      data.message
    );
  }

  return notification;
};

export const getNotifications = (userId: string) =>
  repo.getNotificationsByUserRepo(userId);

export const markAsRead = (id: string) =>
  repo.markAsReadRepo(id);