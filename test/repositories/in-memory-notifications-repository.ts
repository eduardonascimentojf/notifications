import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];
  async create(notification: Notification) {
    this.notifications.push(notification);
  }
  async findMany(_recipientId: string) {
    const findNotifications: Notification[] = [];
    this.notifications.forEach((element) => {
      if (element.recipientId == _recipientId) findNotifications.push(element);
    });
    return findNotifications;
  }
  async updateMany(_recipientId: string, _id?: string) {
    const updatNotifications: Notification[] = [];
    this.notifications.forEach((element) => {
      if (_id != undefined) {
        if (
          element.id == _id &&
          element.recipientId == _recipientId &&
          element.wasRead == false
        ) {
          updatNotifications.push(element);
          element.wasRead = true;
        }
        return updatNotifications;
      } else if (
        element.recipientId == _recipientId &&
        element.wasRead == false
      )
        updatNotifications.push(element);
    });
    return updatNotifications;
  }
}
