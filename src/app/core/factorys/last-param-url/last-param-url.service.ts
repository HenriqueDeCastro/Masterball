import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastParamUrlService {

  get(url: string): string {
    const lastParam: string = url.match('([^/]+)/?$')![1];
    return lastParam;
  }
}
