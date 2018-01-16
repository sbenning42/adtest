import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { galleryApi } from '../../api/api';
import { HttpProvider } from '../http/http';

/*
  Generated class for the GalleryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GalleryProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello GalleryProvider Provider');
  }

  get(pageOptions, filters?): Observable<any> {
    const options = {
      pageIndex: pageOptions.index,
      pageSize: pageOptions.size,
      sort: pageOptions.sort,
      filters: filters
    };
    return this.http.post(galleryApi, options);
  }

}
