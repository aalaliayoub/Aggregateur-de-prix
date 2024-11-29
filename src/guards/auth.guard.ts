import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwt_secret } from 'src/constants/secret';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService:JwtService){}
  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const [type,token]=request.headers.authorization?.split(" ") ?? []
    console.log("auth gard")
    if(!token || type!='bearer'){
      throw new UnauthorizedException("access_token erone")
    }
    try{
      request.user=await this.jwtService.verifyAsync(token,{secret:jwt_secret.secert})
        
    }
    catch(error){
        throw new UnauthorizedException(error)
    }
    return true
  }
}

