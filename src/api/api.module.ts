import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UserModule, EventsModule],
})
export class ApiModule {}
