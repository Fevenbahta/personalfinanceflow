import prisma from "../../config/prisma";

export const createNotificationRepo = (data: any) =>
  prisma.notification.create({ data });

export const getNotificationsByUserRepo = (userId: string) =>
  prisma.notification.findMany({ where: { userId } });

export const markAsReadRepo = (id: string) =>
  prisma.notification.update({
    where: { id },
    data: { isRead: true }
  });