import { Component, OnInit } from '@angular/core';
import { Routing } from '../../core/enum/Routing.enum';
import { ApplicationService } from '../../core/services/application.service';
import { ApplicationCard } from '../../core/models/ApplicationCard.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  public currentIndex: number;

  public applications: ApplicationCard[] = [
    {
      index: 1,
      logo: 'who.png',
      routerLink: Routing.HOME,
      title: 'whoIAm',
    },
    {
      index: 2,
      logo: 'knowledge.png',
      routerLink: Routing.KNOWLEDGE,
      title: 'knowledge',
    },
    {
      index: 3,
      logo: 'curriculum.png',
      routerLink: Routing.CURRICULUM,
      title: 'cv',
    },
    {
      index: 4,
      logo: 'project.png',
      routerLink: Routing.PROJECTS,
      title: 'projects',
    },
    {
      index: 5,
      logo: 'social.png',
      routerLink: Routing.SOCIAL_NETWORK,
      title: 'socialNetwork',
    },
    {
      index: 6,
      logo: 'contact.png',
      routerLink: Routing.CONTACT_ME,
      title: 'contactMe',
    },
    {
      index: 7,
      logo: 'tuto.png',
      routerLink: Routing.TUTORIAL,
      title: 'tutorial',
    },
    {
      index: 8,
      logo: 'setting.png',
      routerLink: Routing.SETTING,
      title: 'setting',
    },
  ];
  private _key = 'currentIndex';
  constructor(private readonly applicationService: ApplicationService) {}
  public closeSideBar(index: number): void {
    sessionStorage.setItem(this._key, index.toString());
    this.currentIndex = index;
    this.applicationService.sidebarVisible$.next(false);
  }

  ngOnInit(): void {
    const index = parseInt(sessionStorage.getItem(this._key));
    if (!index) {
      sessionStorage.setItem(this._key, '1');
    }
    this.currentIndex = index;
  }
}
