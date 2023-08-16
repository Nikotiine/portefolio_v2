import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss'],
})
export class TutorialListComponent {
  public visible = false;
  public isLoginComponent = true;

  public showDialog(): void {
    this.visible = true;
  }

  public register(): void {
    this.isLoginComponent = !this.isLoginComponent;
  }
}
