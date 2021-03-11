import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // define swagger config
  const config = new DocumentBuilder()
  .setTitle('The Family Guy API')
  .setDescription('API includes crud operations in characters and episodes')
  .setVersion('1.0')
  .addTag('Family Guy API')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  app.enableCors();
  app.use(morgan('dev'));
  await app.listen(3001);
}
bootstrap();
