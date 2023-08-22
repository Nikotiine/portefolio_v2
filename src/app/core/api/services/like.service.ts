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

  /** Path part for operation `likeControllerGiveLikeForTutorial()` */
  static readonly LikeControllerGiveLikeForTutorialPath = '/api/like/tutorial';

  /**
   * Envoyer un like pour un tutorial.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `likeControllerGiveLikeForTutorial()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  likeControllerGiveLikeForTutorial$Response(
    params: {
      body: LikeCreateDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<LikeDto>> {
    const rb = new RequestBuilder(this.rootUrl, LikeService.LikeControllerGiveLikeForTutorialPath, 'post');
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
   * Envoyer un like pour un tutorial.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `likeControllerGiveLikeForTutorial$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  likeControllerGiveLikeForTutorial(
    params: {
      body: LikeCreateDto
    },
    context?: HttpContext
  ): Observable<LikeDto> {
    return this.likeControllerGiveLikeForTutorial$Response(params, context).pipe(
      map((r: StrictHttpResponse<LikeDto>): LikeDto => r.body)
    );
  }

}
