import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, Users } from 'src/Schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:Users}])],
  controllers: [UsersController],
  providers: [UsersService,JwtService],
  exports:[UsersService]
})
export class UsersModule {}
