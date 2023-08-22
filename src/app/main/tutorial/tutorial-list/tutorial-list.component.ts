import { Component } from '@angular/core';
import { TutorialAccordion } from '../../../core/models/TutorialAccordion.model';
import { DownloadService } from '../../../core/services/download.service';
import { SecurityService } from '../../../core/services/security.service';
import { LikeService } from '../../../core/api/services/like.service';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss'],
})
export class TutorialListComponent {
  public tutorials: TutorialAccordion[] = [
    {
      id: 1,
      title: 'PL-Sql Server',
      src: 'plsql-server.md',
      comments: 0,
      likes: 0,
    },
    {
      id: 2,
      title: 'MS-Sql Server',
      src: 'mssql-server.md',
      comments: 10,
      likes: 20,
    },
    {
      id: 3,
      title: 'Git-Lab CE',
      src: 'gitlab.md',
      comments: 1,
      likes: 5,
    },
    {
      id: 4,
      title: 'Api Nodejs sous Apache',
      src: 'server-debian.md',
      comments: 1,
      likes: 5,
    },
  ];
  constructor(
    private readonly downloadService: DownloadService,
    private readonly securityService: SecurityService,
    private readonly likeService: LikeService
  ) {}

  onLoad($event: string) {
    console.log($event);
  }

  onError($event: string | Error) {
    console.log($event);
  }

  public downloadMarkdown(source: string): void {
    this.downloadService.download('markdown', 'markdown', source);
  }

  public like(tutorialId: number): void {
    if (!this.securityService.isLogged()) {
      console.log('nope');
    }
  }
}
