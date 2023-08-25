import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Token } from '../api/models/token';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private readonly access_token_key = 'access_token';
  public authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}

  /**
   * Sauvegarde le token dans un cookie
   * Passe le BehaviorSuject a true (signifie a l'applicaiton que l'utilisateur est bien connecter)
   * @param token
   */
  public saveToken(token: Token): void {
    this.cookieService.put(this.access_token_key, token.access_token);
    this.authenticated$.next(true);
  }

  public getToken(): string | undefined {
    return this.cookieService.get(this.access_token_key);
  }

  public isLogged(): boolean {
    const isLogged = !!this.getToken();
    this.authenticated$.next(isLogged);
    return isLogged;
  }

  /**
   * Supprime le token dans les cookies, passe le BehaviorSuject a faux (signifie a l'applicaiton que l'utilisateur est bien decconnecter)
   */
  public logout(): void {
    this.cookieService.remove(this.access_token_key);
    this.authenticated$.next(false);
  }

  // Utilise la methode de logout si le token de l'utilisateur est expirer
  public logoutByResolver(): Promise<boolean> {
    this.logout();
    return this.router.navigate(['/home']);
  }
}
