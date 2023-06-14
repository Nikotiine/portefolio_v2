import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Themes, ThemeService } from '../../core/services/theme.service';
import {
  AvailableLanguage,
  LanguageService,
} from '../../core/services/language.service';
import { DefaultLangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public navbarItems: MenuItem[] = [];
  public splitButtonItems: MenuItem[] = [];

  private readonly translateKey: string = 'navbar';
  constructor(
    private readonly themeService: ThemeService,
    private readonly languageService: LanguageService
  ) {}
  public ngOnInit(): void {
    this.getTranslate();
    this.languageService
      .getChange()
      .subscribe((event: DefaultLangChangeEvent) => {
        this.setNavbarItems(event.translations.navbar);
      });
  }

  public ngOnDestroy(): void {
    this.languageService.getChange().unsubscribe();
  }

  /**
   * Recupere la traduction au pres du language service
   */
  private getTranslate(): void {
    this.languageService.getTranslation(this.translateKey).subscribe({
      next: (translate) => {
        this.setNavbarItems(translate);
      },
    });
  }

  /**
   * Initialise la navbar avec la traduction dans la langue courante
   * @param translate
   */
  private setNavbarItems(translate: any): void {
    this.splitButtonItems = [
      {
        label: translate.language,
        icon: 'pi pi-flag',

        items: [
          {
            label: translate.french,
            icon: 'pi pi-flag-fill text-blue-500',
            disabled:
              this.languageService.getCurrentLanguage() ===
              AvailableLanguage.FRENCH,
            command: () => {
              this.languageService.setLanguage('fr');
            },
          },
          {
            label: translate.english,
            icon: 'pi pi-flag-fill text-red-500',
            disabled:
              this.languageService.getCurrentLanguage() ===
              AvailableLanguage.ENGLISH,
            command: () => {
              this.languageService.setLanguage('en');
            },
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: translate.theme,
        icon: 'pi pi-desktop',
        items: [
          {
            label: translate.dark,
            icon: 'pi pi-moon ',
            disabled: this.themeService.getTheme() === Themes.DARK,
            command: () => {
              this.themeService.useTheme(Themes.DARK);
            },
          },
          {
            label: translate.light,
            icon: 'pi pi-sun ',
            disabled: this.themeService.getTheme() === Themes.LIGHT,
            command: () => {
              this.themeService.useTheme(Themes.LIGHT);
            },
          },
        ],
      },
    ];
    this.navbarItems = [
      {
        label: 'Nicolas G.',
        icon: 'pi pi-user',
      },
      {
        label: translate.myProjects,
        icon: 'pi pi-paperclip',
        items: [
          {
            label: translate.sideProject,
            icon: 'pi pi-github',
          },
          {
            label: translate.projectComplete,
            icon: 'pi pi-link',
          },
        ],
      },
      {
        label: translate.cv,
        icon: 'pi pi-id-card',
        items: [
          {
            label: translate.download,
            icon: 'pi pi-download',
          },
          {
            label: translate.show,
            icon: 'pi pi-desktop',
          },
        ],
      },
      {
        label: translate.contactMe,
        icon: 'pi pi-comment',
      },
    ];
  }
}
