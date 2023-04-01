import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
// import { RolesGuard } from "./guards/auth/roles.guard";

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.setGlobalPrefix('/api')
  app.enableCors();
  // app.useGlobalGuard(RolesGuard);
  const main = app.get(ConfigService).get('main');
  const build = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(main.swagger.title)
    .setDescription(main.swagger.description)
    .setVersion(main.swagger.version)
    .build();
  const document = SwaggerModule.createDocument(app, build);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(main.port);
}
bootstrap();
