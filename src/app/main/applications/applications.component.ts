import { Component } from '@angular/core';
import { Routing } from '../../core/enum/Routing.enum';
import { ApplicationService } from '../../core/services/application.service';
import { ApplicationCard } from '../../core/models/ApplicationCard.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  public applications: ApplicationCard[] = [
    {
      logo: 'who.png',
      routerLink: Routing.HOME,
      title: 'whoIAm',
    },
    {
      logo: 'knowledge.png',
      routerLink: Routing.KNOWLEDGE,
      title: 'knowledge',
    },
    {
      logo: 'curriculum.png',
      routerLink: Routing.CURRICULUM,
      title: 'cv',
    },
    {
      logo: 'project.png',
      routerLink: Routing.PROJECTS,
      title: 'projects',
    },
    {
      logo: 'social.png',
      routerLink: Routing.SOCIAL_NETWORK,
      title: 'socialNetwork',
    },
    {
      logo: 'contact.png',
      routerLink: Routing.SOCIAL_NETWORK,
      title: 'contactMe',
    },
    {
      logo: 'tuto.png',
      routerLink: Routing.SOCIAL_NETWORK,
      title: 'tutorial',
    },
    {
      logo: 'setting.png',
      routerLink: Routing.SOCIAL_NETWORK,
      title: 'setting',
    },
  ];
  constructor(private readonly applicationService: ApplicationService) {}
  public closeSideBar(): void {
    this.applicationService.sidebarVisible$.next(false);
  }
}
