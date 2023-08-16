import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/services/security.service';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss'],
})
export class TutorialListComponent implements OnInit {
  public visible = false;
  public isLoginComponent = true;
  public isLogged: boolean;

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
    this.visible = true;
  }

  public register(): void {
    this.isLoginComponent = !this.isLoginComponent;
  }

  public logout(): void {
    this.securityService.logout();
  }
}
