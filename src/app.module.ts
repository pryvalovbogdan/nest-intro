import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats/cats.controller';

/**
  To add ability to use axios request we should import HttpModule,
  we can configure it by calling register handle.
 **/
@Module({
  imports: [
    CatsModule,
    HttpModule.register({
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    /**
     To configure forRoutes { path: '*', method: RequestMethod.GET } apply to all GET requests
     To exclude routes use exclude method
     **/
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats/(.*)', method: RequestMethod.GET })
      .forRoutes(CatsController);
  }
}