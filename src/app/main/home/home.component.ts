import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public fistLoad = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.fistLoad = true;
    }, 3000);
  }
}
