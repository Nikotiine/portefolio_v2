import { Component } from '@angular/core';
import { TutorialAccordion } from '../../../core/models/TutorialAccordion.model';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss'],
})
export class TutorialListComponent {
  public tutorials: TutorialAccordion[] = [
    {
      title: 'PL-Sql Server',
      src: 'plsql-server.md',
      comments: 0,
      likes: 0,
    },
    {
      title: 'MS-Sql Server',
      src: 'mssql-server.md',
      comments: 10,
      likes: 20,
    },
    {
      title: 'Git-Lab CE',
      src: 'gitlab.md',
      comments: 1,
      likes: 5,
    },
    {
      title: 'Api Nodejs sous Apache',
      src: 'server-debian.md',
      comments: 1,
      likes: 5,
    },
  ];
  constructor() {}

  onLoad($event: string) {
    console.log($event);
  }

  onError($event: string | Error) {
    console.log($event);
  }
}
