import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Field } from 'src/app/models/field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(
    private readonly http: HttpClient,
    private readonly notification: NzNotificationService
  ) { }

  createField(entityName: string, fieldFormValue: any): Observable<Field[]> {
    return this.http
      .post<Field>(`/api/entities/${entityName}/fields`, fieldFormValue)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(EMPTY);
        }),
        map(res => (res as any).data)
      );
  }

  updateField(entityName: string, fieldName: string, fieldFormValue: any): Observable<Field> {
    delete fieldFormValue.name;
    return this.http
      .patch<Field>(`/api/entities/${entityName}/fields/${fieldName}`, fieldFormValue)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(EMPTY);
        }),
        map(res => (res as any).data)
      );
  }

  deleteField(entityName: string, fieldName: string): Observable<any> {
    return this.http
      .delete<Field>(`/api/entities/${entityName}/fields/${fieldName}`)
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
