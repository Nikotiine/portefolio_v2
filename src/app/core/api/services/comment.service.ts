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

import { CommentCreateDto } from '../models/comment-create-dto';
import { CommentDto } from '../models/comment-dto';

@Injectable({ providedIn: 'root' })
export class CommentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `commentControllerNewComment()` */
  static readonly CommentControllerNewCommentPath = '/api/comment/tutorial';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `commentControllerNewComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  commentControllerNewComment$Response(
    params: {
  
    /**
     * Pour voir la connaitre le body merci de regarder dans les DTO => CommentCreateDto
     */
    body: CommentCreateDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<CommentDto>> {
    const rb = new RequestBuilder(this.rootUrl, CommentService.CommentControllerNewCommentPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommentDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `commentControllerNewComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  commentControllerNewComment(
    params: {
  
    /**
     * Pour voir la connaitre le body merci de regarder dans les DTO => CommentCreateDto
     */
    body: CommentCreateDto
    },
    context?: HttpContext
  ): Observable<CommentDto> {
    return this.commentControllerNewComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<CommentDto>): CommentDto => r.body)
    );
  }

  /** Path part for operation `commentControllerFindCommentForTutorial()` */
  static readonly CommentControllerFindCommentForTutorialPath = '/api/comment/tutorial/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `commentControllerFindCommentForTutorial()` instead.
   *
   * This method doesn't expect any request body.
   */
  commentControllerFindCommentForTutorial$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<CommentDto>>> {
    const rb = new RequestBuilder(this.rootUrl, CommentService.CommentControllerFindCommentForTutorialPath, 'get');
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
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `commentControllerFindCommentForTutorial$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  commentControllerFindCommentForTutorial(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<CommentDto>> {
    return this.commentControllerFindCommentForTutorial$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CommentDto>>): Array<CommentDto> => r.body)
    );
  }

}
