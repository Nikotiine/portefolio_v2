import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Themes, ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public items: MenuItem[] = [];
  public splitItems: MenuItem[] = [];
  public isDarkThemeSelected = false;

  constructor(private readonly themeService: ThemeService) {}
  ngOnInit(): void {
    this.isDarkThemeSelected = this.themeService.getTheme() === Themes.LIGHT;
    this.splitItems = [
      {
        label: 'Francais',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Anglais',
        icon: 'pi pi-times',
      },
    ];
    this.items = [
      {
        label: 'Nicolas G.',
        icon: 'pi pi-user',
      },
      {
        label: 'Mes Projets',
        icon: 'pi pi-paperclip',
        items: [
          {
            label: 'Side-Projects',
            icon: 'pi pi-github',
          },
          {
            label: 'Projets terminés',
            icon: 'pi pi-link',
          },
        ],
      },
      {
        label: 'Mon CV',
        icon: 'pi pi-id-card',
        items: [
          {
            label: 'Telecharger',
            icon: 'pi pi-download',
          },
          {
            label: 'Afficher',
            icon: 'pi pi-desktop',
          },
        ],
      },
      {
        label: 'Me Contacter',
        icon: 'pi pi-comment',
      },
    ];
  }

  /**
   * Change le theme css suivant l'etat du booleen
   * @param checked
   */
  public changeTheme(checked: boolean): void {
    if (checked) {
      this.themeService.switchTheme(Themes.LIGHT);
    } else {
      this.themeService.switchTheme(Themes.DARK);
    }
  }
}
