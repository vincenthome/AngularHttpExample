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

  getSession() {
    // tslint:disable-next-line: max-line-length
    const t = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiJiMWYwMDM2OC02YzhlLTQ4NTEtYjJlNy0xZWM5ODRlYmYwODEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zNGE1OGIxZi1iYjlmLTQ4ZTUtOTFmZi0zOTI0NDI2NzYzYmUvIiwiaWF0IjoxNTkyMDk0Mjg1LCJuYmYiOjE1OTIwOTQyODUsImV4cCI6MTU5MjA5ODE4NSwiYWlvIjoiNDJkZ1lQRFFETjI4ZGtXNi9ycUw5L2E5V1I4aHBsN3lJTjNJNVl0WXJQZmQ2NzhrZ3RNQiIsImFtciI6WyJwd2QiXSwiZmFtaWx5X25hbWUiOiJMZXVuZyIsImdpdmVuX25hbWUiOiJWaW5jZW50IiwiaGFzZ3JvdXBzIjoidHJ1ZSIsImlwYWRkciI6IjY4LjgzLjU4LjIwNCIsIm5hbWUiOiJWaW5jZW50IExldW5nIiwibm9uY2UiOiJhMWNlMDA2Ny0zYjIzLTRmYmMtYmRmMS0wYTY0NjM4NDg1NTMiLCJvaWQiOiJmODVmOWViNy0yZDRhLTRkZTEtOThjNC1jNjdiNjg2Njk4OGMiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtODYxNTY3NTAxLTY4MjAwMzMzMC03MjUzNDU1NDMtOTE5MSIsInN1YiI6Ik1mbEVnZ19FTkYzaDd3NEZ6WWd1amg5aG1QSGdvVGozZzlQS19hVUdidUUiLCJ0aWQiOiIzNGE1OGIxZi1iYjlmLTQ4ZTUtOTFmZi0zOTI0NDI2NzYzYmUiLCJ1bmlxdWVfbmFtZSI6InZpbmNlbnRsQGltbW9ubGluZS5jb20iLCJ1cG4iOiJ2aW5jZW50bEBpbW1vbmxpbmUuY29tIiwidXRpIjoiQU8tR2Qxd2s2MG1fLW9JSUMxb2xBQSIsInZlciI6IjEuMCJ9.txdMKYi--21dAVuCXfNN3skKVoBZmzreKHmaRnNzmQ6JtMg0WFjcSPqTtwihu31vovcZOzO57G6RU3aSUz_IHgi_-S4E-aFPtOySwkF7DZUrWGDLQ1tm1Q5v4uRtllvl2PS_Qo1GlhXLdDJ0d0X6U9Y5u4bmunfN0qVKiQhAV21BSLvurrXEzglX7AB7quuMu6VhZzTRYwuA1Z8mud7LDJnToSvycd3_oz7AgQQ_wSYRcDxH4n9g9YyKpqm6hWMlo6r8CaPhu6q2tCXIo3ls5YXM3JFie7jJJUKAKRBwfqLIhwqCtKm4dv4CYk-OXHe2Yv1AgQ2rZSEjecQ-Jhv5FA';
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': `bearer ${t}`,
        'Content-Type': 'application/json',
      })
    }
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${t}`);
    return this.httpClient.get('http://ereceipts-api-dev.ubiqu.io/api/session', httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    )
  }

}
