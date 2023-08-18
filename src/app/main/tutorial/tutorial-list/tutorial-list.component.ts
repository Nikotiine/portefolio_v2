import { Component } from '@angular/core';
import { TutorialAccordion } from '../../../core/models/TutorialAccordion.model';
import { DownloadService } from '../../../core/services/download.service';

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
  constructor(private readonly downloadService: DownloadService) {}

  onLoad($event: string) {
    console.log($event);
  }

  onError($event: string | Error) {
    console.log($event);
  }

  download(src: string) {
    this.downloadService.downloadMarkdownFile(src).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = src;
        link.click();
        window.URL.revokeObjectURL(url);
      },
    });
  }
}
