import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss'],
})
export class TutorialListComponent {
  constructor() {}

  onLoad($event: string) {
    console.log($event);
  }

  onError($event: string | Error) {
    console.log($event);
  }
}
