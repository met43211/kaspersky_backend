import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authKey: string = request.headers['auth-key'];
    if (!authKey || authKey != process.env.AUTH_KEY) throw new UnauthorizedException();
    return true;
  }
}
