import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private readonly http: HttpClient) {}

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
