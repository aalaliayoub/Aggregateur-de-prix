import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signupDto } from './dto/signup.dto';
import { signDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import *as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private userService:UsersService,private jwtService:JwtService){}
  async signup(sgnupDto:signupDto){

    const user = await this.userService.create(sgnupDto)
    return await user.save();
    
  }

  async signin(sgn:signDto){
    const user=await this.userService.findbyemail(sgn.email)
    if (!user || !bcrypt.compareSync(sgn.password, user.password)) {
      throw new UnauthorizedException("vous n avez pas de compte penser a regestrez-vous");
    }
    const payload = { sub:user._id, username:user.username,email:user.email };
    const access_token=await this.jwtService.signAsync(payload)
    return {
      ssae:'acess token of user',
      access_token:access_token
    }
  }


}

