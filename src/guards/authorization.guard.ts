import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class authorizationGuard implements CanActivate {
    constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ):boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles= this.reflector.get(ROLES_KEY,context.getClass())
    if(!request.user.role||request.user.role!=roles){
        throw new UnauthorizedException()
    }
    return true
  } 
}

