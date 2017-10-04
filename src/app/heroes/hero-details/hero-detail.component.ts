import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';
import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-hero-detail',
  template: `
  <h2>HEROES</h2>


  <div *ngIf="hero$ | async as hero">
    <h3>"{{ hero.name }}"</h3>
    <div>
      <label>Id: </label>{{ hero.id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes(hero)">Back</button>
    </p>
  </div>
  `,
  animations: [slideInDownAnimation]
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero | undefined>;
  @Input() hero: Hero;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) { }

  ngOnInit() {

    console.log('hero detail ngOnInit');

    // const id = this.route.snapshot.paramMap.get('id');

    // this.hero$ = this.service.getHero(+id!);

    // this.route.paramMap.subscribe(paramMap => {
    //   const id2 = paramMap.get('id');
    //   console.log('paramMap id', id2);
    // });

    this.hero$ = this.route.paramMap
      .switchMap(params => {

        console.log('in switchmap');
        const id = params.get('id');
        if (id) {
          return this.service.getHero(+id);
        } else {
          return Promise.resolve(undefined);
        }
      });

    // this.hero$.subscribe();
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
