import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signup.dto';
import { signDto } from './dto/signin.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signup')
  singup(@Body() sgnupDto:signupDto){
    return this.authService.signup(sgnupDto)
  }

  
  @Post('signin')
  signin(@Body() sgnDto:signDto){
    return this.authService.signin(sgnDto)
  }
  
  
}
