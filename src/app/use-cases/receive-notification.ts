import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { FindNotificationBody } from '@infra/http/dtos/notification-body';

@Injectable()
export class ReceiveNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: FindNotificationBody): Promise<Notification[]> {
    const { recipientId } = request;

    const notifications = await this.notificationsRepository.findMany(
      recipientId,
    );

    return notifications;
  }
}
