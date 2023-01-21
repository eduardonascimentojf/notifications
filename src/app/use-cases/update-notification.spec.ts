import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { SendNotification } from './send-notification';
import { ReceiveNotification } from './receive-notification';
import { ChangeNotification } from './update-notification';

describe('Update notification', () => {
  it('should be able to update a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const receiveNotification = new ReceiveNotification(
      notificationsRepository,
    );
    const changeNotification = new ChangeNotification(notificationsRepository);
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
    const _id = receiveNotifications[0].id;
    const _recipientId = receiveNotifications[0].recipientId;

    const TestId = await changeNotification.execute({
      recipientId: _recipientId,
      id: _id,
    });
    expect(TestId).toHaveLength(1);

    const TestRecipientId = await changeNotification.execute({
      recipientId: _recipientId,
    });

    expect(TestRecipientId.length).toEqual(receiveNotifications.length - 1);
  });
});
