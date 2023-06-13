import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private readonly themeService: ThemeService) {}
  ngOnInit(): void {
    //Init du theme css
    this.themeService.initTheme();
  }
}
