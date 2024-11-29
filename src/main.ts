import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import *as morgan from 'morgan';



async function bootstrap() {
 
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,  
    forbidNonWhitelisted:true, 
    transform:true   
  })) 
  //app.useGlobalGuards(new AuthGuard(new JwtService));//! les gardes globaux sont utilisés dans toute l'application, pour chaque contrôleur et chaque gestionnaire de route.
  app.use(morgan('dev'))
  await app.listen(process.env.PORT);
}
bootstrap();
