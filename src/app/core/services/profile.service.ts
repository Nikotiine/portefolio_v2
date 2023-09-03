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

  /**
   * Retourne l'objet UserProfile quand l'utlisateur est connecter
   */
  public getUserProfile(): UserProfileDto {
    return this.user;
  }

  /**
   * Mise en cache du UserProfile
   * @param user le dto UserProfileDto
   */
  public setUserProfile(user: UserProfileDto): void {
    this.user = user;
    this.admin = user ? user.role === UserRoles.ADMIN : false;
  }

  // Indique si l'utlisateur est admin ou non
  public isAdmin(): boolean {
    return this.admin;
  }

  /**
   * Permet d'avoir le UserProfileDto sous forme d'observable et mis en cache avec un relaod automatique des donne toutes
   * le 15 minutes
   */
  public getUserProfileObservable(): Observable<UserProfileDto> {
    if (!this.user$) {
      this.user$ = this.authenticationService
        .authenticationControllerMe()
        .pipe(shareReplay(1, ProfileService.SHARE_REPLAY_TIMER));
    }
    return this.user$;
  }
}
