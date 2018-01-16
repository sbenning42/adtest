import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { annexesApi } from '../../api/api';
import { HttpProvider } from '../../providers/http/http';

/*
  Generated class for the AnnexesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnnexesProvider {

  categories: StaticData[];
  styles: StaticData[];
  periods: StaticData[];
  conditions: StaticData[];
  designers: StaticData[];
  brands: StaticData[];
  materials: StaticData[];
  colors: StaticData[];

  constructor(public http: HttpProvider) {
    console.log('Hello AnnexesProvider Provider');
  }

  fetch() {
    this.http.get(annexesApi).subscribe(annexes => {
      this.categories = annexes['categories'];
      this.styles = annexes['styles'];
      this.periods = annexes['periods'];
      this.conditions = annexes['conditions'];
      this.designers = annexes['designers'];
      this.brands = annexes['brands'];
      this.materials = annexes['materials'];
      this.colors = annexes['colors'];
    });
  }

}

class StaticData {
  constructor(public id: string, public name: string) { }
}