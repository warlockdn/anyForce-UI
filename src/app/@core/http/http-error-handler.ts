import { Observable, throwError } from 'rxjs';
import { Logger } from 'src/app/@core/logger.service';
import { environment } from 'src/environments/environment';

const logger = new Logger('Error Service ');

export class HttpErrorHandler {

  static handleError(error: any): Observable<any> {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    if (!environment.production) {
      logger.error(errorMessage);
    }


    return throwError(errorMessage);

  }

}
