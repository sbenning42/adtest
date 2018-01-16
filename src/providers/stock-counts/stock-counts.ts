import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StockCountsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockCountsProvider {

  all: number;
  creation: number;
  sold: number;

  constructor(public http: HttpClient) {
    console.log('Hello StockCountsProvider Provider');
  }

  setAll(count: number) {
    this.all = count;
  };

  setCreation(count: number) {
    this.creation = count;
  };

  setSold(count: number) {
    this.sold = count;
  };

  getAll(): number {
    return this.all;
  }

  getCreation(): number {
    return this.creation;
  }

  getSold(): number {
    return this.sold;
  }

}
