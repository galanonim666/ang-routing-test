import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Router } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeroesModule } from "./heroes/heroes.module";
import { CrisisCenterRoutingModule } from "./crisis-center/crisis-center-routing.module";
import { ComposeMessageComponent } from "./compose-message/compose-message.component";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { DialogService } from "./dialog.service";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    HeroesModule,

    LoginRoutingModule,
    AppRoutingModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log("Routes: ", JSON.stringify(router.config, undefined, 2));
  }
}
