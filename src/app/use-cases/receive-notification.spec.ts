import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { ReceiveNotification } from './receive-notification';
import { SendNotification } from './send-notification';

describe('Receive notification', () => {
  it('should be able to receive a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const receiveNotification = new ReceiveNotification(
      notificationsRepository,
    );
    let uuid: string = randomUUID();
    const uuidAux = uuid;
    const length = 5;
    const notification: Notification[] = [];

    for (let index = 0; index < length; index++) {
      if (index >= length - 2) uuid = randomUUID();
      const notificationSend: any = await sendNotification.execute({
        content: `Teste de notificação,${index}`,
        category: `Teste${index}`,
        recipientId: uuid,
      });
      notification.push(notificationSend);
    }
    const receiveNotifications = await receiveNotification.execute({
      recipientId: uuidAux,
    });
    expect(notificationsRepository.notifications).toHaveLength(length);
    expect(receiveNotifications.length).toEqual(length - 2);
  });
});
