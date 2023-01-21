import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notiication', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Teste de notificação'),
      category: 'Teste',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});
