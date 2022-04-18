import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
  .setTitle('API documents')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('TaskController')
  .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      TaskModule,
      AuthModule
    ],
  });
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
