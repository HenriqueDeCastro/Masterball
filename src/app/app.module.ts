import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LateralMenuModule } from './shared/components/lateral-menu/lateral-menu.module';
import { ToolbarModule } from './shared/components/toolbar/toolbar.module';
import { LoadingInterceptor } from './core/interceptors/loading/loading.interceptor';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    LateralMenuModule,
    ToolbarModule,

    MatProgressBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
