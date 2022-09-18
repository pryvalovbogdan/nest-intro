import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CatchExceptionFilter } from './catch-exeption.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  /** By default, Nest use Express, but you can change it into Fastify new FastifyAdapter() https://www.fastify.io/ **/
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: false });
  /**
    We can add logger as middleware or by use Express
    app.use(LoggerMiddleware);
   **/
  const httpAdapter = app.get(HttpAdapterHost);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  console.log('port', port);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new CatchExceptionFilter(httpAdapter));

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
