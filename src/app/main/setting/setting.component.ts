import { Component, OnInit } from '@angular/core';
import { Themes, ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { SelectButtonOptions } from '../../core/models/SelectButtonOptions.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
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

  setLanguage(value: string): void {
    // console.log(value);
    this.languageService.setLanguage(value);
  }

  public setTheme(value: string): void {
    const theme = value === Themes.DARK ? Themes.DARK : Themes.LIGHT;
    this.themeService.useTheme(theme);
  }

  ngOnInit(): void {
    this.getTranslate();
  }
  private getTranslate(): void {
    this.languageService.getTranslation('setting').subscribe({
      next: (translate) => {
        this.languageOptions = [
          {
            label: translate.french,
            value: 'fr',
          },
          {
            label: translate.english,
            value: 'en',
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
      },
    });
  }
}
