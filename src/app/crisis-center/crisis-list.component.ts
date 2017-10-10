import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Crisis, CrisisService } from './crisis.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises$ | async"
        [class.selected]="crisis.id === selectedId">
        <a [routerLink]="[crisis.id]">
          <span class="badge">{{ crisis.id }}</span>{{ crisis.name }}
        </a>
      </li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class CrisisListComponent implements OnInit {
  crises$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.crises$ = this.service.getCrises();

    this.route.paramMap
      .subscribe((params) => {
        this.selectedId = +params.get('id')!;
      });
  }
}
