import { NestFactory } from '@nestjs/core';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1'],
    type: VersioningType.URI,
  });
  await app.listen(3000);
}
bootstrap();
