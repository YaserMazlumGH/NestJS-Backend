import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ });
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));

  const config = new DocumentBuilder()
    .setTitle('Odessa')
    .setDescription('The Odessa API description')
    .setVersion('1.0').addServer("")
    .build();

  const document = SwaggerModule.createDocument(app, config, { });
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
