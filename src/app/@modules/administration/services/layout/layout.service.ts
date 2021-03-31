import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Layout } from 'src/app/models/layout.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private readonly http: HttpClient,
    private readonly notification: NzNotificationService,
  ) { }

  getLayouts(entity: string): Observable<Layout[]> {
    return this.http
      .get<Layout[]>(`/api/entities/${entity}/layouts`)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of([]);
        }),
        map(res => (res as any).data)
      );
  }

  getLayout(entity: string, layoutId: string): Observable<Layout> {
    return this.http
      .get<Layout>(`/api/entities/${entity}/layouts/${layoutId}`)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(null);
        }),
        map(res => (res as any).data)
      );
  }

  saveLayout(entity: string, layout: Layout): Observable<Layout> {
    return this.http
      .post<Layout>(`/api/entities/${entity}/layouts`, layout)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(null);
        }),
        map(res => (res as any).data)
      );
  }

  patchLayout(entity: string, layoutId: string, layout: Layout): Observable<Layout> {
    return this.http
      .patch<Layout>(`/api/entities/${entity}/layouts/${layoutId}`, layout)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(null);
        }),
        map(res => (res as any).data)
      );
  }

  handleError = (error: any): Observable<any> => {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.notification.create('error', 'Error', 'Error processing. Please try again later.', {
      nzPlacement: 'bottomRight',
      nzAnimate: true,
      nzDuration: 6000
    });

    return throwError(errorMessage);

  }

}
