import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingInterceptor } from './core/interceptors/loading/loading.interceptor';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
