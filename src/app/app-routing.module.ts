import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { LayoutComponent } from './layout/layout.component';
import { HeroesModule } from './heroes/heroes.module';
import { LoginModule } from './login.module';
import { AuthService } from './auth.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/root', pathMatch: 'full' },
  {
    path: 'root',
    component: LayoutComponent,
    children: [
      {
        path: 'compose',
        component: ComposeMessageComponent,
        outlet: 'popup'
      },
      // { path: '', redirectTo: '/superheroes', pathMatch: 'full' },
      {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'crisis-center',
        loadChildren: 'app/crisis-center/crisis.module#CrisisCenterModule',
        data: { preload: true }
      },
      // {
      //   path: '',
      //   loadChildren: () => LoginModule
      // },
      {
        path: '',
        loadChildren: 'app/login.module#LoginModule'
      },
      // {
      //   path: '',
      //   loadChildren: () => HeroesModule
      // },
      {
        path: '',
        loadChildren: 'app/heroes/heroes.module#HeroesModule'
      },
      { path: '**', component: PageNotFoundComponent },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
      // preloadingStrategy: SelectivePreloadingStrategy
    })
  ],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy,
    AuthGuard,
    AuthService
  ]
})
export class AppRoutingModule {}
