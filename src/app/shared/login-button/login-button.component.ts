import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../core/services/security.service';
import { UserProfileDto } from '../../core/api/models/user-profile-dto';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
})
export class LoginButtonComponent implements OnInit {
  public visible = false;
  public isLoginComponent = true;
  public isLogged: boolean;
  public newUser: UserProfileDto;

  constructor(private readonly securityService: SecurityService) {
    this.isLogged = this.securityService.isLogged();
  }

  public ngOnInit(): void {
    this.securityService.authenticated$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
      },
    });
  }
  public showDialog(): void {
    this.visible = !this.visible;
  }

  public register(): void {
    this.isLoginComponent = !this.isLoginComponent;
  }

  public logout(): void {
    this.securityService.logout();
  }

  public preFillLoginForm($event: UserProfileDto): void {
    this.newUser = $event;
    this.isLoginComponent = true;
  }
}
