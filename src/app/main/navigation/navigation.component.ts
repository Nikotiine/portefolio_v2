import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  items: MenuItem[] = [];
  splitItems: MenuItem[] = [];
  checked = false;
  ngOnInit(): void {
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
        label: 'Profil',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Qui suis-je',
            icon: 'pi pi-info',
          },
          {
            label: 'Linkedin',
            icon: 'pi pi-linkedin',
          },

          {
            separator: true,
          },
          {
            label: 'Mes formations',
            icon: 'pi pi-book',
          },
          {
            label: 'Competence',
            icon: 'pi pi-wallet',
          },
        ],
      },
      {
        label: 'Projets',
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
        label: 'Contact',
        icon: 'pi pi-comment',
      },
    ];
  }
}
