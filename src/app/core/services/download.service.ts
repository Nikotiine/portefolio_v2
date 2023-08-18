import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private readonly http: HttpClient) {}
  downloadMarkdownFile(file: string): Observable<Blob> {
    return this.http.get('assets/markdown/' + file, { responseType: 'blob' });
  }
}
