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

import { UserProfileDto } from '../models/user-profile-dto';
import { UserRegisterDto } from '../models/user-register-dto';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userControllerRegister()` */
  static readonly UserControllerRegisterPath = '/api/user/register';

  /**
   * Creation d' un nouvel utilisateur.
   *
   * La creation d'un nouveau compte utilisateur avec l'objet UserRegisterDto dans le body
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerRegister()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerRegister$Response(
    params: {
  
    /**
     * Pour voir la description du body merci de regarder dans les DTO => UserRegisterDto
     */
    body: UserRegisterDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<UserProfileDto>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerRegisterPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Creation d' un nouvel utilisateur.
   *
   * La creation d'un nouveau compte utilisateur avec l'objet UserRegisterDto dans le body
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerRegister$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerRegister(
    params: {
  
    /**
     * Pour voir la description du body merci de regarder dans les DTO => UserRegisterDto
     */
    body: UserRegisterDto
    },
    context?: HttpContext
  ): Observable<UserProfileDto> {
    return this.userControllerRegister$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>): UserProfileDto => r.body)
    );
  }

}
