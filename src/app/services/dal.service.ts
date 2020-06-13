import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Post } from '../models/post';
import { User, Users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DalService {

  private rootJSONPlaceHoldertUrl = 'https://jsonplaceholder.typicode.com';
  private getPostsUrl = `${this.rootJSONPlaceHoldertUrl}/posts`;

  private rootReqRestUrl = 'https://reqres.in/api';
  private getUsersUrl = `${this.rootReqRestUrl}/users`;

  constructor(private httpClient: HttpClient) { }

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


  // Req Res
  getUsers(): Observable<Users> {
    return this.httpClient.get<Users>(`${this.getUsersUrl}?page=2`).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.getUsersUrl}/${id}`).pipe(
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

}
