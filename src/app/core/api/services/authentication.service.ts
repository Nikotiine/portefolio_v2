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

import { Token } from '../models/token';
import { UserCredentialsDto } from '../models/user-credentials-dto';
import { UserProfileDto } from '../models/user-profile-dto';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authenticationControllerLogin()` */
  static readonly AuthenticationControllerLoginPath = '/api/authentication/login';

  /**
   * Point d'access à l'API.
   *
   * Une fois la validation du couple email/password faite, retourne un token d'access
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerLogin$Response(
    params: {
  
    /**
     * Pour la description de body merci de regarder la section DTO => UserCredentialDto
     */
    body: UserCredentialsDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Token>> {
    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Token>;
      })
    );
  }

  /**
   * Point d'access à l'API.
   *
   * Une fois la validation du couple email/password faite, retourne un token d'access
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerLogin(
    params: {
  
    /**
     * Pour la description de body merci de regarder la section DTO => UserCredentialDto
     */
    body: UserCredentialsDto
    },
    context?: HttpContext
  ): Observable<Token> {
    return this.authenticationControllerLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<Token>): Token => r.body)
    );
  }

  /** Path part for operation `authenticationControllerMe()` */
  static readonly AuthenticationControllerMePath = '/api/authentication/me';

  /**
   * Jwt authentifacation.
   *
   * Point d'entree pour l'autentification du token
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerMe()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerMe$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<UserProfileDto>> {
    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerMePath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserProfileDto>;
      })
    );
  }

  /**
   * Jwt authentifacation.
   *
   * Point d'entree pour l'autentification du token
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerMe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerMe(
    params?: {
    },
    context?: HttpContext
  ): Observable<UserProfileDto> {
    return this.authenticationControllerMe$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>): UserProfileDto => r.body)
    );
  }

}
