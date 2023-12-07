import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Permet de telecharger les fichier MD ou pdf present dans le repertoire asset (pdf/Md)
   * @param type le type de fichier qui sera telecharger (pdf/md)
   * @param repository le repeteroire dans le quel il se trouve
   * @param source le nom du fichier source
   */
  public download(type: string, repository: string, source: string): void {
    this.http
      .get('assets/' + repository + '/' + source, { responseType: 'blob' })
      .subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'text/' + type });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = source;
          link.click();
          window.URL.revokeObjectURL(url);
        },
      });
  }
}
