import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Post } from '../models/post';
import { User, ReqResResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DalService {

  private rootJSONPlaceHoldertUrl = 'https://jsonplaceholder.typicode.com';
  private getPostsUrl = `${this.rootJSONPlaceHoldertUrl}/posts`;

  private rootReqRestUrl = 'https://reqres.in/api';
  private getUsersUrl = `${this.rootReqRestUrl}/users`;

  constructor(private httpClient: HttpClient) { }

  // Req Res
  getUsers(): Observable<User[]> {
    return this.httpClient.get<ReqResResponse>(`${this.getUsersUrl}?page=2`).pipe(
      // tap(res => console.log(res)),
      map(res => res.data as User[]),
      // tap(res => console.log(res)),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<ReqResResponse>(`${this.getUsersUrl}/${id}`).pipe(
      map(res => res.data as User),
      catchError(this.handleError)
    );
  }

  getDelayedUsers(): Observable<User[]> {
    return this.httpClient.get<ReqResResponse>(`${this.getUsersUrl}?delay=3&page=1`).pipe(
      map(res => res.data as User[]),
      catchError(this.handleError)
    );
  }

  postUser() {
    return this.httpClient.post(this.getUsersUrl, {
      name: 'morpheus',
      job: 'leader',
      email: 'jdoe@live.com',
    }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  putUser(id: number) {
    return this.httpClient.put(`${this.getUsersUrl}/${id}`, {
      name: 'morpheus',
      job: 'leader',
      email: 'jdoe@live.com',
    }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  patchUser(id: number) {
    return this.httpClient.patch(`${this.getUsersUrl}/${id}`, {
      name: 'morpheus',
      job: 'leader',
      email: 'jdoe@live.com',
    }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.getUsersUrl}/${id}`).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.getPostsUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.getPostsUrl}/${id}`).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.error.message}`;
    } else {
      errorMessage = `Server http status code: ${err.status}, error: ${err.message}`;
    }
    console.log(err);
    return throwError(errorMessage);
  }

  getPostFullResponse(id: number): Observable<HttpResponse<Post>> {
    return this.httpClient.get<Post>(`${this.getPostsUrl}/${id}`, {
      observe: 'response'
    }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getWithHeadersOptions() {
    const t = '...';
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': `bearer ${t}`,
        'Content-Type': 'application/json',
      })
    };
    // setting bearer token
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${t}`);
    return this.httpClient.get('http://ereceipts-api-dev.ubiqu.io/api/session', httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    )
  }

}
