import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
//Customisation de la classe Message Service de NG PRIME
export class CustomMessageService {
  constructor(
    private readonly messageService: MessageService,
    private readonly languageService: LanguageService
  ) {}

  /**
   * Affiche les message de success
   * @param summary Sommaire du toast , traduction a partir de i18n dans l'object summaryMessage
   * @param message Message afficher dans le taost, traduit a partir de i18n dans l'object successMessage
   */
  public successMessage(summary: string, message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: this.languageService.instantTranslate(
        'summaryMessage.' + summary
      ),
      detail: this.languageService.instantTranslate(
        'successMessage.' + message
      ),
    });
  }

  /**
   * Affiche les message d'erreur
   * @param summary Sommaire du toast , traduction a partir de i18n dans l'object summaryMessage
   * @param message Message afficher dans le taost, traduit a partir de i18n dans l'object errorMessage
   */
  public errorMessage(summary: string, message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: this.languageService.instantTranslate(
        'summaryMessage.' + summary
      ),
      detail: this.languageService.instantTranslate('errorMessage.' + message),
    });
  }
}
