import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate( context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    return this.validateRequest(req);
  }

  validateRequest(req) {
    const bearerToken = req.headers.authorization || ' ';
    const token = bearerToken.split(" ")[1];
    const secret = process.env.JWT_SECRET || 'secret';
    try {
      const information : any = verify(token, secret);
      req.userId = information.userId;
      return true;
    } catch (error) {
      return false;
    }
  }
}
