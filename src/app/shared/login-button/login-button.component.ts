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
  // Affiche la boite de dialogue pour la connexion ou creation de compte
  public showDialog(): void {
    this.visible = !this.visible;
  }

  // Defini si c'est c'est la page de connection ou de creation de compte qui doit etre afficher
  public register(): void {
    this.isLoginComponent = !this.isLoginComponent;
  }

  // Deconnection de l'utlisateur
  public logout(): void {
    this.securityService.logout();
  }

  // Lors d'une creation d'un nouveau compte, affiche et pre rempli le formulaire de connection
  public preFillLoginForm($event: UserProfileDto): void {
    this.newUser = $event;
    this.isLoginComponent = true;
  }
}
