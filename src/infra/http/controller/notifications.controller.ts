import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import {
  CreateNotificationBody,
  FindNotificationBody,
  UpdateNotificationBody,
} from '../dtos/notification-body';
import { SendNotification } from '@app/use-cases/send-notification';
import { ReceiveNotification } from '@app/use-cases/receive-notification';
import { ChangeNotification } from '@app/use-cases/update-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private receiveNotification: ReceiveNotification,
    private changeNotification: ChangeNotification,
  ) {}

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const notification = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });
    return { notification };
  }
  @Get()
  async findNotifications(@Body() body: FindNotificationBody) {
    const { recipientId } = body;

    const notifications = await this.receiveNotification.execute({
      recipientId,
    });
    return notifications;
  }
  @Patch()
  async updateNotification(@Body() body: UpdateNotificationBody) {
    const { recipientId, id } = body;

    const notifications = await this.changeNotification.execute({
      recipientId,
      id,
    });
    return notifications;
  }
}
