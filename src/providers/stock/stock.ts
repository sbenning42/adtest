import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { stockApi } from '../../api/api';
import { HttpProvider } from '../http/http';

/*
  Generated class for the StockProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello StockProvider Provider');
  }

  get(pageOptions): Observable<any> {
    const options = {
      pageIndex: pageOptions.index,
      pageSize: pageOptions.size,
      sort: pageOptions.sort,
    };
    return this.http.post(stockApi, options);
  }

}
