import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

// Modules
import { AppModule } from './application/app.module';

// Services
import { ApplicationConfigService } from './infrastructure/config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Tiny URL project')
    .setVersion('0.0.1')
    .addTag('Redirect')
    .addTag('Domain Visits')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ApplicationConfigService);

  await app.listen(configService.getAppPort());
}
bootstrap();
