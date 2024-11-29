import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { signDto } from './auth/dto/signin.dto';


@Controller()
export class AppController {
  constructor(private readonly authService:AuthService) {}


  
}
