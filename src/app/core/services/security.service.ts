import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Token } from '../api/models/token';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { UserProfileDto } from '../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private readonly access_token_key = 'access_token';
  public authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router,
    private readonly profileService: ProfileService
  ) {}

  /**
   * Sauvegarde le token dans un cookie
   * Passe le BehaviorSuject a true (signifie a l'applicaiton que l'utilisateur est bien connecter)
   * @param token
   */
  public saveToken(token: Token): void {
    this.cookieService.put(this.access_token_key, token.access_token);
  }

  /**
   * log l'utilisateur apres la connexion / stocke son profil dans le profil service (mise en cache )
   * met a jour l'observable authenticated$
   * @param user UserProfileDto
   */
  public login(user: UserProfileDto): void {
    this.profileService.setUserProfile(user);
    this.authenticated$.next(true);
  }

  /**
   * Retourne le token socker dans les cookies
   */
  public getToken(): string | undefined {
    return this.cookieService.get(this.access_token_key);
  }

  /**
   * Retourne true ou false en fonction du token socker dans les cookie
   */
  public isLogged(): boolean {
    return !!this.getToken();
  }

  /**
   * Supprime le token dans les cookies, passe le BehaviorSuject a faux (signifie a l'applicaiton que l'utilisateur est bien decconnecter)
   */
  public logout(): void {
    this.cookieService.remove(this.access_token_key);
    this.authenticated$.next(false);
    this.profileService.setUserProfile(null);
  }

  // Utilise la methode de logout si le token de l'utilisateur est expirer
  public logoutByResolver(): Promise<boolean> {
    this.logout();
    return this.router.navigate(['/home']);
  }
}
