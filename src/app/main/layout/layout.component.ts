import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { ApplicationService } from '../../core/services/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public sidebarVisible = false;
  constructor(
    private readonly themeService: ThemeService,
    private readonly applicationService: ApplicationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly profileService: ProfileService
  ) {}
  ngOnInit(): void {
    //Init du theme css
    this.themeService.initTheme();
    this.applicationService.sidebarVisible$.subscribe({
      next: (isVisible) => {
        this.sidebarVisible = isVisible;
      },
    });
    //Mise en cache du profil utilisateur (si connecter )dans le profil service
    const user = this.activatedRoute.snapshot.data['user'];
    if (user) {
      this.profileService.setUserProfile(user);
    }
  }

  public setSidebarVisible(): void {
    this.applicationService.sidebarVisible$.next(true);
  }

  public onHide(): void {
    this.applicationService.sidebarVisible$.next(false);
  }
}
