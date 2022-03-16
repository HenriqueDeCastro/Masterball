import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.setLoading(true, request.url);

    return next.handle(request)
      .pipe(catchError((err: any) => {
        this.loadingService.setLoading(false, request.url);
        return throwError(err);
      }))
      .pipe(map((evt: any) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.setLoading(false, request.url);
        }
        return evt;
        }
      ))
  }
}
