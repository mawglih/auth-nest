import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const coockieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(coockieSession({
    keys: ['asdfsg']
  }));
  await app.listen(8080);
}
bootstrap();
