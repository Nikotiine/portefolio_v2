import { Component, OnDestroy, OnInit } from '@angular/core';
import { Themes, ThemeService } from '../../core/services/theme.service';
import {
  AvailableLanguage,
  LanguageService,
} from '../../core/services/language.service';
import { SelectButtonOptions } from '../../core/models/SelectButtonOptions.model';
import { DefaultLangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
  public themeOptions: SelectButtonOptions[] = [];
  public languageOptions: SelectButtonOptions[] = [];
  public theme: string;
  public language: string;

  constructor(
    private readonly themeService: ThemeService,
    private readonly languageService: LanguageService
  ) {
    this.theme = this.themeService.getTheme();
    this.language = this.languageService.getCurrentLanguage();
  }

  public ngOnInit(): void {
    this.getTranslate();
    this.languageService
      .getChange()
      .subscribe((event: DefaultLangChangeEvent) => {
        this.setSelectButtons(event.translations.setting);
      });
  }
  private getTranslate(): void {
    this.languageService.getTranslation('setting').subscribe({
      next: (translate) => {
        this.setSelectButtons(translate);
      },
    });
  }

  /**
   * Change le langage selectioner sur le select button
   * @param language
   */
  public setLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  /**
   * Change le theme css selectioner sur le select button
   * @param value
   */
  public setTheme(value: string): void {
    const theme = value === Themes.DARK ? Themes.DARK : Themes.LIGHT;
    this.themeService.useTheme(theme);
  }

  // Enleve la souscription au language service
  ngOnDestroy(): void {
    this.languageService.getChange().unsubscribe();
  }

  /**
   * Initialise les select button
   * @param translate traduction des label des boutons
   */
  private setSelectButtons(translate: any): void {
    this.languageOptions = [
      {
        label: translate.french,
        value: AvailableLanguage.FRENCH,
      },
      {
        label: translate.english,
        value: AvailableLanguage.ENGLISH,
      },
    ];
    this.themeOptions = [
      {
        label: translate.light,
        value: Themes.LIGHT,
      },
      {
        label: translate.dark,
        value: Themes.DARK,
      },
    ];
  }
}
