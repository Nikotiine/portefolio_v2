import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from './services/profile.service';
import { map } from 'rxjs/operators';
import { UserRoles } from './enum/UserRoles.enum';
import { SecurityService } from './services/security.service';
import { Routing } from './enum/Routing.enum';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly profileService: ProfileService,
    private readonly router: Router,
    private readonly securityService: SecurityService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogged = this.securityService.isLogged();
    const unauthorizedRedirection = () =>
      this.router.navigateByUrl(Routing.NOT_FOUND, {
        state: { message: '403' },
      });

    if (!isLogged) {
      return unauthorizedRedirection();
    }

    if (!this.profileService.getUserProfile()) {
      return this.profileService.getUserProfileObservable().pipe(
        map((user) => {
          if (user.role === UserRoles.ADMIN) {
            return true;
          }
          unauthorizedRedirection();
          return false;
        })
      );
    }
    const isAdmin = this.profileService.isAdmin();
    return isAdmin ? true : unauthorizedRedirection();
  }
}
