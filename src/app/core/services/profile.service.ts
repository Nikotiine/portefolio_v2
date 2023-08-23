import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { UserProfileDto } from '../api/models/user-profile-dto';
import { AuthenticationService } from '../api/services/authentication.service';
import { UserRoles } from '../enum/UserRoles.enum';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private user: UserProfileDto;
  private admin = false;
  private user$: Observable<UserProfileDto>;
  private static SHARE_REPLAY_TIMER = 1000 * 60 * 15;
  constructor(private readonly authenticationService: AuthenticationService) {}
  public getUserProfile(): UserProfileDto {
    return this.user;
  }
  public setUserProfile(user: UserProfileDto) {
    this.user = user;
    this.admin = user.role === UserRoles.ADMIN;
  }
  public isAdmin(): boolean {
    return this.admin;
  }
  public getUserProfileObservable(): Observable<UserProfileDto> {
    if (!this.user$) {
      this.user$ = this.authenticationService
        .authenticationControllerMe()
        .pipe(shareReplay(1, ProfileService.SHARE_REPLAY_TIMER));
    }
    return this.user$;
  }
}
