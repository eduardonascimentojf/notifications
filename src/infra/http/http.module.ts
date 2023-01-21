import { Module } from '@nestjs/common/decorators';
import { SendNotification } from '@app/use-cases/send-notification';
import { ReceiveNotification } from '@app/use-cases/receive-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controller/notifications.controller';
import { ChangeNotification } from '@app/use-cases/update-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification, ReceiveNotification, ChangeNotification],
})
export class HttpModule {}
