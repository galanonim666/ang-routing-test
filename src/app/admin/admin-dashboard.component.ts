import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SelectivePreloadingStrategy } from '../selective-preloading-strategy';

@Component({
  template: `
    <p>Dashboard</p>

    <p>Session ID: {{ sessionId | async }}</p>
    <a id="anchor"></a>
    <p>Token: {{ token | async }}</p>

    Preloaded Modules
    <ul>
      <li *ngFor="let m of modules">{{ m }}</li>
    </ul>
  `
})
export class AdminDashboardComponent implements OnInit {
  sessionId: Observable<string>;
  token: Observable<string>;
  modules: string[];

  constructor(
    private route: ActivatedRoute,
    private selectivePreloadingStrategy: SelectivePreloadingStrategy
  ) {
    this.modules = selectivePreloadingStrategy.preloadedModules;
  }

  ngOnInit() {
    // Capture the session ID if available
    this.sessionId = this.route.queryParamMap.map(
      params => params.get('session_id') || 'None'
    );

    // Capture the fragment if available
    this.token = this.route.fragment.map(fragment => fragment || 'None');
  }
}
