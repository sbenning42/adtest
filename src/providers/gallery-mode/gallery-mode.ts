import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the GalleryModeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GalleryModeProvider {

  private mode: string;
  private mode$: BehaviorSubject<string>;

  constructor(public http: HttpClient) {
    this.mode = 'list';
    this.mode$ = new BehaviorSubject(this.mode);
    console.log('Hello GalleryModeProvider Provider');
  }

  change() {
    this.mode = this.mode === 'list' ? 'apps' : 'list';
    this.mode$.next(this.mode);
  }

  get(): Observable<string> {
    return this.mode$.asObservable();
  }

}
