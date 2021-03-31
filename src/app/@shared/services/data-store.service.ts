import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  /** Contains list of Entities */
  entities$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

}
