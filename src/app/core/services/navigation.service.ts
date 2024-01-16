import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  enableBackButtom$ = new BehaviorSubject(false);
  constructor(private location: Location, private router: Router) {
    this.router.events
      .pipe(
        // Filter the NavigationEnd
        filter((event) => event instanceof NavigationStart)
      )
      .subscribe((event: any) => {
        const path = event.url.split('/');
        path.shift();
        const isSubPath = path.length > 2 ? true : false;
        this.enableBackButtom$.next(isSubPath);
      });
  }

  back() {
    this.location.back();
  }
}
