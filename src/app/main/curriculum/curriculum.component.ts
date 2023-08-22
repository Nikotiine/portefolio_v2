import { Component } from '@angular/core';
import { DownloadService } from '../../core/services/download.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent {
  constructor(private readonly downloadService: DownloadService) {}
  public downloadPdf(): void {
    this.downloadService.download('pdf', 'pdf', 'Nicolas_Godin_CV.pdf');
  }
}
