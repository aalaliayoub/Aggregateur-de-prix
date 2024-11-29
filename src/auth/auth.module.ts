import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, Users } from 'src/Schemas/users.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwt_secret } from 'src/constants/secret';


@Module({
  imports:[
    UsersModule,
    MongooseModule.forFeature([{name:User.name,schema:Users}]),
    ConfigModule
    ,
    JwtModule.register({
      global:true,
      secret:jwt_secret.secert,
      signOptions:{expiresIn:60*60*24*30},
    }),
  ],

  controllers:[
    AuthController,
  ],

  providers:[
    AuthService,
    UsersService,
    ConfigService,
  ],
  exports:[AuthService]
})



export class AuthModule {

 
}
