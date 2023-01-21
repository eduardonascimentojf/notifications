import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { UpdateNotificationBody } from '@infra/http/dtos/notification-body';

@Injectable()
export class ChangeNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: UpdateNotificationBody): Promise<Notification[]> {
    const { recipientId, id } = request;

    const notifications = await this.notificationsRepository.updateMany(
      recipientId,
      id,
    );

    return notifications;
  }
}
