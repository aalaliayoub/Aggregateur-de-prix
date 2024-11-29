import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),MongooseModule.forRoot(process.env.DATABASE_LOCAL),UsersModule, AuthModule, ProductModule],
  controllers:[AppController],
  providers:[AuthService]
})
export class AppModule {
  
}
