import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  public sidebarVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
