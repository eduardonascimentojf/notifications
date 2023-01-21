import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findMany(_recipientId: string): Promise<Notification[]>;
  abstract updateMany(
    _recipientId: string,
    _id?: string,
  ): Promise<Notification[]>;
}
