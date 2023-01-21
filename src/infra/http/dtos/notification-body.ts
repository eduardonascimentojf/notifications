import { IsNotEmpty, IsUUID, Length, IsOptional } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  category: string;
}

export class FindNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}

export class UpdateNotificationBody {
  @IsUUID()
  recipientId: string;
  @IsUUID()
  @IsOptional()
  id?: string;
}
