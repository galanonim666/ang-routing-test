import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';

@Injectable()
export class CrisisDetailResolver implements Resolve<Crisis | null> {
  constructor(private cs: CrisisService, private router: Router, private activetedRoute: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis | null> {
    let id = route.paramMap.get('id');
    if (id) {
      return this.cs.getCrisis(id).take(1).map(crisis => {
        if (crisis) {
          return crisis;
        } else { // id not found
          // this.router.createUrlTree()
          // this.router.navigate(['../'], { relativeTo: this.activetedRoute });
          this.router.navigate(['/crisis-center']);
          return null;
        }
      });
    }

    return Observable.of(null);
  }
}
