import { Component } from '@angular/core';
import { Routing } from '../../core/enum/Routing.enum';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  //public ROUTING = Routing;
  protected readonly Routing = Routing;
  constructor(private readonly applicationService: ApplicationService) {}
  public closeSideBar(): void {
    this.applicationService.sidebarVisible$.next(false);
  }
}
