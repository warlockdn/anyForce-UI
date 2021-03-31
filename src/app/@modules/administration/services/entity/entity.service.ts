import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataStoreService } from './../../../../@shared/services/data-store.service';
import { Entity } from './../../../../models/entity';

@Injectable()
export class EntityService {

  constructor(
    private readonly http: HttpClient,
    private readonly notification: NzNotificationService,
    private readonly dataStore: DataStoreService
  ) { }

  /**
   * Loads Entities List from Subject if not found loads from API
   */
  loadEntities(): Observable<Entity[]> {
    return new Observable((observer) => {
      const entities = this.dataStore.entities$.getValue();
      if (!entities) {
        this.getEntites()
          .subscribe(response => {
            this.dataStore.entities$.next(response);
            observer.next(response);
          });
      } else {
        observer.next(entities);
      }
    });
  }

  getEntites(): Observable<Entity[]> {
    return this.http
      .get('/api/entities')
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of([]);
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
