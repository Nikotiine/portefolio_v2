import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable } from 'rxjs';

import { SecurityService } from '../services/security.service';
import { UserProfileDto } from '../api/models/user-profile-dto';
import { map } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<UserProfileDto | boolean> {
  constructor(
    private readonly securityService: SecurityService,

    private readonly profileService: ProfileService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProfileDto | null | boolean> {
    if (this.securityService.isLogged()) {
      return this.profileService.getUserProfileObservable().pipe(
        catchError((e) => {
          return this.securityService.logoutByResolver();
        }),
        map((res) => res)
      );
    }
    return null;
  }
}
