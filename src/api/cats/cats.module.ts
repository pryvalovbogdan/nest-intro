import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

/** When you want to provide a set of providers which should be available everywhere out-of-the-box
 (e.g., helpers, database connections, etc.), make the module global with the @Global() decorator. **/
@Global()
@Module({
  imports: [HttpModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
