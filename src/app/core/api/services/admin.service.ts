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

import { ClearDatabaseResultDto } from '../models/clear-database-result-dto';
import { CommentDto } from '../models/comment-dto';
import { UserProfileDto } from '../models/user-profile-dto';

@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `adminControllerGetAllUsers()` */
  static readonly AdminControllerGetAllUsersPath = '/api/admin/users';

  /**
   * Retourne tous les utilisateurs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerGetAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerGetAllUsers$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerGetAllUsersPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserProfileDto>>;
      })
    );
  }

  /**
   * Retourne tous les utilisateurs.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerGetAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerGetAllUsers(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<UserProfileDto>> {
    return this.adminControllerGetAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserProfileDto>>): Array<UserProfileDto> => r.body)
    );
  }

  /** Path part for operation `adminControllerFindAllComments()` */
  static readonly AdminControllerFindAllCommentsPath = '/api/admin/comments';

  /**
   * Retourne tous les commentaires.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerFindAllComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerFindAllComments$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<CommentDto>>> {
    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerFindAllCommentsPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommentDto>>;
      })
    );
  }

  /**
   * Retourne tous les commentaires.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerFindAllComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerFindAllComments(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<CommentDto>> {
    return this.adminControllerFindAllComments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CommentDto>>): Array<CommentDto> => r.body)
    );
  }

  /** Path part for operation `adminControllerDisableUser()` */
  static readonly AdminControllerDisableUserPath = '/api/admin/user/{id}';

  /**
   * Desactive l'utilisateur.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerDisableUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerDisableUser$Response(
    params: {

    /**
     * id de l' utilisateur
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerDisableUserPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserProfileDto>>;
      })
    );
  }

  /**
   * Desactive l'utilisateur.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerDisableUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerDisableUser(
    params: {

    /**
     * id de l' utilisateur
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<Array<UserProfileDto>> {
    return this.adminControllerDisableUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserProfileDto>>): Array<UserProfileDto> => r.body)
    );
  }

  /** Path part for operation `adminControllerDisableComment()` */
  static readonly AdminControllerDisableCommentPath = '/api/admin/comment/{id}';

  /**
   * Desactive le commentaire.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerDisableComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerDisableComment$Response(
    params: {

    /**
     * id du commentaire
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<CommentDto>>> {
    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerDisableCommentPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommentDto>>;
      })
    );
  }

  /**
   * Desactive le commentaire.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerDisableComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerDisableComment(
    params: {

    /**
     * id du commentaire
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<Array<CommentDto>> {
    return this.adminControllerDisableComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CommentDto>>): Array<CommentDto> => r.body)
    );
  }

  /** Path part for operation `adminControllerClearDatabase()` */
  static readonly AdminControllerClearDatabasePath = '/api/admin/database';

  /**
   * Nettoyage de la base de donnée.
   *
   * Vide les entre de la base de donnee (utilisateur/like/comment) qui sont en status inactif
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerClearDatabase()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerClearDatabase$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ClearDatabaseResultDto>> {
    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerClearDatabasePath, 'delete');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClearDatabaseResultDto>;
      })
    );
  }

  /**
   * Nettoyage de la base de donnée.
   *
   * Vide les entre de la base de donnee (utilisateur/like/comment) qui sont en status inactif
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerClearDatabase$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerClearDatabase(
    params?: {
    },
    context?: HttpContext
  ): Observable<ClearDatabaseResultDto> {
    return this.adminControllerClearDatabase$Response(params, context).pipe(
      map((r: StrictHttpResponse<ClearDatabaseResultDto>): ClearDatabaseResultDto => r.body)
    );
  }

}
