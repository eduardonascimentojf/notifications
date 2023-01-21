import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,

        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
  async findMany(_recipientId: string): Promise<Notification[]> {
    const notifications: any = await this.prismaService.notification.findMany({
      where: {
        recipientId: _recipientId,
      },
      orderBy: {
        wasRead: 'asc',
      },
    });
    return notifications;
  }
  async updateMany(
    _recipientId: string,
    _id?: string,
  ): Promise<Notification[]> {
    const notificationUptate: any =
      await this.prismaService.notification.updateMany({
        where: {
          OR: [_id != undefined ? { id: _id } : { recipientId: _recipientId }],
          NOT: {
            wasRead: true,
          },
        },
        data: {
          wasRead: true,
          readAt: new Date(),
        },
      });
    return notificationUptate;
  }
}
