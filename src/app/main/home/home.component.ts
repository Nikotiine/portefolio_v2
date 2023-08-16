import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public firstLoad: boolean;
  private readonly showAnimation: string = 'showAnimation';
  constructor() {
    this.firstLoad = !!localStorage.getItem(this.showAnimation);
  }
  ngOnInit(): void {
    // Si premiere visite affiche le logo de bienvenue pdt 3 seconde avant la transition
    if (!this.firstLoad) {
      localStorage.setItem(this.showAnimation, 'true');
      setTimeout(() => {
        this.firstLoad = true;
      }, 3000);
    }
  }
}
