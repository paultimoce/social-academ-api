import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global validation config
  app.useGlobalPipes(new ValidationPipe());

  // Swagger config for the API documentation. This is only for development purposes.
  // The documentation will be available at /api
  const config = new DocumentBuilder()
    .setTitle('Nexus Academy API')
    .setDescription('This is the OpenAPI documentation for the nexus academy API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_URL, app, document);

  const port = process.env.PORT;  
  await app.listen(3000);

  const logger = new Logger();
  logger.log(`Application listening on port ${port} ...`);
}

bootstrap();
