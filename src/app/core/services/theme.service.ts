import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly localStorageKey: string = 'theme';
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Permet de changer le theme clair ou sombre
   * le theme choisi sera 'viva'
   * @param theme enum Themes (dark ou light)
   */
  public useTheme(theme: Themes): void {
    const themeLink: HTMLLinkElement = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = 'viva-' + theme + '.css';
    }
    this.saveTheme(theme);
  }

  /**
   * Sauvegarde le theme choisi par l'utilisateur dans le localStorage
   * @param theme enum Themes (dark ou light)
   */
  private saveTheme(theme: Themes): void {
    localStorage.setItem(this.localStorageKey, theme);
  }

  /**
   * Retourne le theme stocke dans le localStorage / si aucune donnée presente renvoie le theme light par defaut
   */
  public getTheme(): string {
    let theme: Themes = Themes.LIGHT;
    const userTheme: string | null = localStorage.getItem(this.localStorageKey);
    if (userTheme) {
      theme = userTheme === Themes.LIGHT ? Themes.LIGHT : Themes.DARK;
    }
    return theme;
  }

  /**
   * Initialise le theme au demarrage de l'application
   * Si aucune donnee en localStorage met le theme LIGHT par defaut
   */
  public initTheme(): void {
    const userTheme: string | null = localStorage.getItem(this.localStorageKey);
    let theme: Themes = Themes.LIGHT;
    if (userTheme) {
      theme = userTheme === Themes.LIGHT ? Themes.LIGHT : Themes.DARK;
    }
    this.useTheme(theme);
  }
}
