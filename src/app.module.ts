import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  UseInterceptors,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { CatsModule } from './api/cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './api/cats/cats.controller';
import { TransformInterceptor } from './transform.interceptor';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ApiModule } from './api/api.module';
import { UserModule } from './api/user/user.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

/**
  To add ability to use axios request we should import HttpModule,
  we can configure it by calling register handle.
 **/
/**
 * Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
 **/
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    HttpModule.register({
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
    }),
    CatsModule,
    ApiModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
@UseInterceptors(TransformInterceptor)
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
