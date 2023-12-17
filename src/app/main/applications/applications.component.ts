import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Fragment, Routing } from '../../core/enum/Routing.enum';
import { ApplicationService } from '../../core/services/application.service';
import { ApplicationCard } from '../../core/models/ApplicationCard.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  @Output() anchor: EventEmitter<string> = new EventEmitter<string>();

  public currentIndex: number;

  public applications: ApplicationCard[] = [
    {
      index: 1,
      logo: 'who.png',
      routerLink: Routing.HOME,
      title: 'whoIAm',
      fragment: Fragment.WHO_I_AM,
    },
    {
      index: 2,
      logo: 'knowledge.png',
      routerLink: Routing.HOME,
      title: 'knowledge',
      fragment: Fragment.KNOWLEDGE,
    },
    {
      index: 3,
      logo: 'curriculum.png',
      routerLink: Routing.HOME,
      title: 'cv',
      fragment: Fragment.CURRICULUM,
    },
    {
      index: 4,
      logo: 'project.png',
      routerLink: Routing.HOME,
      title: 'projects',
      fragment: Fragment.PROJECTS,
    },
    {
      index: 5,
      logo: 'social.png',
      routerLink: Routing.HOME,
      title: 'socialNetwork',
      fragment: Fragment.SOCIAL_NETWORK,
    },
    {
      index: 6,
      logo: 'contact.png',
      routerLink: Routing.HOME,
      title: 'contactMe',
      fragment: Fragment.SOCIAL_NETWORK,
    },
    {
      index: 7,
      logo: 'tuto.png',
      routerLink: Routing.TUTORIAL,
      title: 'tutorial',
      fragment: null,
    },
    {
      index: 8,
      logo: 'setting.png',
      routerLink: Routing.SETTING,
      title: 'setting',
      fragment: null,
    },
  ];
  private _key = 'currentIndex';
  constructor(private readonly applicationService: ApplicationService) {}
  public closeSideBar(index: number): void {
    sessionStorage.setItem(this._key, index.toString());
    this.currentIndex = index;
    this.applicationService.sidebarVisible$.next(false);
    const app = this.applications.find((app) => app.index === index);
    this.anchor.emit(app.routerLink);
  }

  ngOnInit(): void {
    const index = parseInt(sessionStorage.getItem(this._key));
    if (!index) {
      sessionStorage.setItem(this._key, '1');
    }
    this.currentIndex = index;
  }
}
