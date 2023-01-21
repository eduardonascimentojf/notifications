export interface ReceiveNotificationModel {
  id: string;
  recipientId: string;
  content: string;
  category: string;
  wasRead: boolean;
  readAt?: Date | null;
  createdAt: Date;
}
