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

import { LikeCreateDto } from '../models/like-create-dto';
import { LikeDto } from '../models/like-dto';

@Injectable({ providedIn: 'root' })
export class LikeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `likeControllerLikeTutorial()` */
  static readonly LikeControllerLikeTutorialPath = '/api/like/tutorial';

  /**
   * Like pour tutorials.
   *
   * Mettre ou supprimer un like d'un tutorial
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `likeControllerLikeTutorial()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  likeControllerLikeTutorial$Response(
    params: {
      body: LikeCreateDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<LikeDto>> {
    const rb = new RequestBuilder(this.rootUrl, LikeService.LikeControllerLikeTutorialPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LikeDto>;
      })
    );
  }

  /**
   * Like pour tutorials.
   *
   * Mettre ou supprimer un like d'un tutorial
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `likeControllerLikeTutorial$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  likeControllerLikeTutorial(
    params: {
      body: LikeCreateDto
    },
    context?: HttpContext
  ): Observable<LikeDto> {
    return this.likeControllerLikeTutorial$Response(params, context).pipe(
      map((r: StrictHttpResponse<LikeDto>): LikeDto => r.body)
    );
  }

  /** Path part for operation `likeControllerGetAllLikesOfTutorials()` */
  static readonly LikeControllerGetAllLikesOfTutorialsPath = '/api/like/tutorials';

  /**
   * Recupere tous les likes.
   *
   * Recupere en bdd tout les likes actifs des tutoriels
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `likeControllerGetAllLikesOfTutorials()` instead.
   *
   * This method doesn't expect any request body.
   */
  likeControllerGetAllLikesOfTutorials$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<LikeDto>>> {
    const rb = new RequestBuilder(this.rootUrl, LikeService.LikeControllerGetAllLikesOfTutorialsPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LikeDto>>;
      })
    );
  }

  /**
   * Recupere tous les likes.
   *
   * Recupere en bdd tout les likes actifs des tutoriels
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `likeControllerGetAllLikesOfTutorials$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  likeControllerGetAllLikesOfTutorials(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<LikeDto>> {
    return this.likeControllerGetAllLikesOfTutorials$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LikeDto>>): Array<LikeDto> => r.body)
    );
  }

}
