import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
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

  private getEntites(): Observable<Entity[]> {
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

  createEntity(entity: Entity): Observable<Entity> {
    return this.http
      .post(`/api/entities`, entity)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(EMPTY);
        }),
        map(res => (res as any).data)
      );
  }

  updateEntity(name: string, entity: Entity): Observable<Entity> {
    return this.http
      .patch(`/api/entities/${name}`, entity)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(EMPTY);
        }),
        map(res => (res as any).data)
      );
  }

  deleteEntity(entity: Entity): Observable<any> {
    return this.http
      .delete(`/api/entities/${entity.name}`)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(EMPTY);
        }),
        map(res => res)
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
