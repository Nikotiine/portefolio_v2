import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Token } from '../api/models/token';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private readonly access_token_key = 'access_token';
  public authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private readonly cookieService: CookieService) {}

  public saveToken(token: Token): void {
    this.cookieService.put(this.access_token_key, token.toString());
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

  public logout(): void {
    this.cookieService.remove(this.access_token_key);
    this.authenticated$.next(false);
  }
}
