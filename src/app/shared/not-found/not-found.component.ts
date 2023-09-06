import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Routing } from '../../core/enum/Routing.enum';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public message = '';
  public ROUTING = Routing;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}
  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: () => {
        console.log(window.history);
        this.message = window.history.state.message;
      },
    });
  }
}
