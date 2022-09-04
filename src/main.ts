import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CatchExceptionFilter } from './catch-exeption.filter';

async function bootstrap() {
  /** By default, Nest use Express, but you can change it into Fastify new FastifyAdapter() https://www.fastify.io/ **/
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: false });
  /**
    We can add logger as middleware or by use Express
    app.use(LoggerMiddleware);
   **/
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
