import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public sidebarVisible = false;
  constructor(
    private readonly themeService: ThemeService,
    private readonly applicationService: ApplicationService
  ) {}
  ngOnInit(): void {
    //Init du theme css
    this.themeService.initTheme();
    this.applicationService.sidebarVisible$.subscribe({
      next: (isVisible) => {
        this.sidebarVisible = isVisible;
      },
    });
  }

  public setSidebarVisible(): void {
    this.applicationService.sidebarVisible$.next(true);
  }
}
