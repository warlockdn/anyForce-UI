import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class IsEditingCandeactivateGuard implements CanDeactivate<unknown> {

  constructor() {}

  // component: unknown,
  // currentRoute: ActivatedRouteSnapshot,
  // currentState: RouterStateSnapshot,
  // nextState?: RouterStateSnapshot

  canDeactivate(component: CanComponentDeactivate): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
