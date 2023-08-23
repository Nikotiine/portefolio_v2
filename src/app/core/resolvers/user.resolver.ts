import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { AuthenticationService } from '../api/services/authentication.service';
import { SecurityService } from '../services/security.service';
import { UserProfileDto } from '../api/models/user-profile-dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<UserProfileDto | boolean> {
  constructor(
    private readonly securityService: SecurityService,
    private readonly authenticationService: AuthenticationService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProfileDto | null | boolean> {
    if (this.securityService.isLogged()) {
      return this.authenticationService.authenticationControllerMe().pipe(
        catchError((e) => {
          return this.securityService.logoutByResolver();
        }),
        map((res) => res)
      );
    }
    return null;
  }
}
