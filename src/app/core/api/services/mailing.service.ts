/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { MailDto } from '../models/mail-dto';

@Injectable({ providedIn: 'root' })
export class MailingService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `mailingControllerContact()` */
  static readonly MailingControllerContactPath = '/api/mailing/contact';

  /**
   * Post form contact.
   *
   * Point d'entrée pour l'envoie du formulaire de contact
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mailingControllerContact()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mailingControllerContact$Response(
    params: {
      body: MailDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<boolean>> {
    const rb = new RequestBuilder(this.rootUrl, MailingService.MailingControllerContactPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Post form contact.
   *
   * Point d'entrée pour l'envoie du formulaire de contact
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mailingControllerContact$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mailingControllerContact(
    params: {
      body: MailDto
    },
    context?: HttpContext
  ): Observable<boolean> {
    return this.mailingControllerContact$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
