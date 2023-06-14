import { EventEmitter, Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export enum AvailableLanguage {
  FRENCH = 'fr',
  ENGLISH = 'en',
}
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly localStorageKey: string = 'language';
  private supportedLanguages: string[] = [
    AvailableLanguage.FRENCH,
    AvailableLanguage.ENGLISH,
  ];
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
        navigatorLanguage = AvailableLanguage.FRENCH;
      }
      userLanguage = navigatorLanguage;
    }
    this.setLanguage(userLanguage);
  }

  /**
   * Activation du translate service avec le langague passer en parametre
   * @param userLanguage string ( code iso de la langue v0.0.2 seul 'fr ou 'en' supporte )
   */
  public setLanguage(userLanguage: string): void {
    localStorage.setItem(this.localStorageKey, userLanguage);
    this.translateService.use(userLanguage);
  }

  /**
   * Retourne la traduction d'une ligne ou d'un groupe de ligne suivant la key passee en paremetre
   * @param key String , cle de traduction
   */
  public getTranslation(key: string): Observable<any> {
    return this.translateService.get(key);
  }

  /**
   * Permet de surveiller le changement de langue
   */
  public getChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  /**
   * Retourne le language en cours d'utilisation
   */
  public getCurrentLanguage() {
    return this.translateService.currentLang;
  }
}
