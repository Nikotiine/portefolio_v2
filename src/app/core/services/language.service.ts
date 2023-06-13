import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly localStorageKey: string = 'language';
  private supportedLanguages: string[] = ['fr', 'en'];
  constructor(private readonly translateService: TranslateService) {
    this.initLanguage();
  }

  /**
   * Initialise le language en fonction de :
   * - Si l'utlisateur a deja visiter le site et a une language enregistrer dans le localstorage
   * - Sinon defini le language par rapport au language du navigateur
   * / si le language du navigateur n'est pas supporter , met le francais par defaut
   * @private
   */
  private initLanguage(): void {
    this.translateService.addLangs(this.supportedLanguages);
    let userLanguage: string | null = localStorage.getItem(
      this.localStorageKey
    );
    if (!userLanguage) {
      let navigatorLanguage: string = navigator.language.split('-')[0];
      if (!this.supportedLanguages.includes(navigatorLanguage)) {
        navigatorLanguage = 'fr';
      }
      userLanguage = navigatorLanguage;
      localStorage.setItem(this.localStorageKey, navigatorLanguage);
    }
    this.setLanguage(userLanguage);
  }

  /**
   * Activation du translate service avec le langague passer en parametre
   * @param userLanguage string ( code iso de la langue v0.0.2 seul 'fr ou 'en' supporte )
   */
  public setLanguage(userLanguage: string): void {
    this.translateService.use(userLanguage);
  }
}
