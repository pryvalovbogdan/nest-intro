import { Observable } from 'rxjs';

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * Guards are executed after all middleware, but before any interceptor or pipe.
 **/
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Validate request right here validateRequest(request)
    return request;
  }
}
