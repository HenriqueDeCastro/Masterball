import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastParamUrlService {

  get(url: string): string {
    return url.match('([^/]+)/?$')![1]
  }
}
