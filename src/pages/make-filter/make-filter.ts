import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AnnexesProvider } from '../../providers/annexes/annexes';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the MakeFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-make-filter',
  templateUrl: 'make-filter.html',
})
export class MakeFilterPage {

  userName: string;
  categoryName: string;
  styleName: string;
  periodName: string;
  conditionName: string;
  materialName: string;
  colorName: string;
  designerName: string;
  brandName: string;

  users: {id: string, name: string}[] = [];
  categories: {id: string, name: string}[] = [];
  styles: {id: string, name: string}[] = [];
  periods: {id: string, name: string}[] = [];
  conditions: {id: string, name: string}[] = [];
  materials: {id: string, name: string}[] = [];
  colors: {id: string, name: string}[] = [];
  designers: {id: string, name: string}[] = [];
  brands: {id: string, name: string}[] = [];

  _matchUsers$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);
  _matchCategories$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);
  _matchStyles$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);
  _matchPeriods$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);
  _matchConditions$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);
  _matchMaterials$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);
  _matchColors$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);
  _matchDesigners$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);
  _matchBrands$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);

  matchUsers$: Observable<{id: string, name: string}[]> = this._matchUsers$.asObservable();
  matchCategories$: Observable<{id: string, name: string}[]> = this._matchCategories$.asObservable();
  matchStyles$: Observable<{id: string, name: string}[]> = this._matchStyles$.asObservable();
  matchPeriods$: Observable<{id: string, name: string}[]> = this._matchPeriods$.asObservable();
  matchConditions$: Observable<{id: string, name: string}[]> = this._matchConditions$.asObservable();
  matchMaterials$: Observable<{id: string, name: string}[]> = this._matchMaterials$.asObservable();
  matchColors$: Observable<{id: string, name: string}[]> = this._matchColors$.asObservable();
  matchDesigners$: Observable<{id: string, name: string}[]> = this._matchDesigners$.asObservable();
  matchBrands$: Observable<{id: string, name: string}[]> = this._matchBrands$.asObservable();

  focus: string;

  filters = {
    user: [],
    category: [],
    style: [],
    period: [],
    condition: [],
    material: [],
    color: [],
    designer: [],
    brand: [],
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public annexes: AnnexesProvider, public viewCtrl: ViewController, public api: ApiProvider) {
    if (!(this.annexes.categories && this.annexes.categories[0])) {
      this.annexes.fetch();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeFilterPage');
    this.api.getUsers().subscribe(users => this.users = users);
    this.categories = this.annexes.categories;
    this.styles = this.annexes.styles;
    this.periods = this.annexes.periods;
    this.conditions = this.annexes.conditions;
    this.materials = this.annexes.materials;
    this.colors = this.annexes.colors;
    this.designers = this.annexes.designers;
    this.brands = this.annexes.brands;
    const filters = this.navParams.get('filters');
    this.filters.user = filters.filter(f => f.type === 'user');
    this.filters.category = filters.filter(f => f.type === 'category');
    this.filters.style = filters.filter(f => f.type === 'style');
    this.filters.period = filters.filter(f => f.type === 'period');
    this.filters.designer = filters.filter(f => f.type === 'designer');
    this.filters.brand = filters.filter(f => f.type === 'brand');
  }

  setFocus(key: string) {
    this.focus = key;
    switch (key) {
      case 'users':
        this.getMatchUsers();
        break ;
      case 'categories':
        this.getMatchCategories();
        break ;
      case 'styles':
        this.getMatchStyles();
        break ;
      case 'periods':
        this.getMatchPeriods();
        break ;
      case 'designers':
        this.getMatchDesigners();
        break ;
      case 'brands':
        this.getMatchBrands();
        break ;
    }
    if (!key) {
      this.userName = '';
      this.categoryName = '';
      this.styleName = '';
      this.periodName = '';
      this.conditionName = '';
      this.materialName = '';
      this.colorName = '';
      this.designerName = '';
      this.brandName = '';
    }
  }

  getMatchUsers() {
    const items = this.userName && this.userName.length > 0
      ? this.users.filter(user => user.name.toLowerCase().search(this.userName.toLowerCase()) < 0 ? false : true)
      : this.users
    this._matchUsers$.next(items);
  }
  getMatchCategories() {
    const items = this.categoryName && this.categoryName.length > 0
      ? this.categories.filter(category => category.name.toLowerCase().search(this.categoryName.toLowerCase()) < 0 ? false : true)
      : this.categories
    this._matchCategories$.next(items);
  }
  getMatchStyles() {
    const items = this.styleName && this.styleName.length > 0
      ? this.styles.filter(style => style.name.toLowerCase().search(this.styleName.toLowerCase()) < 0 ? false : true)
      : this.styles
    this._matchStyles$.next(items);
  }
  getMatchPeriods() {
    const items = this.periodName && this.periodName.length > 0
      ? this.periods.filter(period => period.name.toLowerCase().search(this.periodName.toLowerCase()) < 0 ? false : true)
      : this.periods
    this._matchPeriods$.next(items);
  }
  getMatchConditions() {
    const items = this.conditionName && this.conditionName.length > 0
      ? this.conditions.filter(condition => condition.name.toLowerCase().search(this.conditionName.toLowerCase()) < 0 ? false : true)
      : this.conditions
    this._matchConditions$.next(items);
  }
  getMatchMaterials() {
    const items = this.materialName && this.materialName.length > 0
      ? this.materials.filter(material => material.name.toLowerCase().search(this.materialName.toLowerCase()) < 0 ? false : true)
      : this.materials
    this._matchMaterials$.next(items);
  }
  getMatchColors() {
    const items = this.colorName && this.colorName.length > 0
      ? this.colors.filter(color => color.name.toLowerCase().search(this.colorName.toLowerCase()) < 0 ? false : true)
      : this.colors
    this._matchColors$.next(items);
  }
  getMatchDesigners() {
    const items = this.designerName && this.designerName.length > 0
      ? this.designers.filter(designer => designer.name.toLowerCase().search(this.designerName.toLowerCase()) < 0 ? false : true)
      : this.designers
    this._matchDesigners$.next(items);
  }
  getMatchBrands() {
    const items = this.brandName && this.brandName.length > 0
      ? this.brands.filter(brand => brand.name.toLowerCase().search(this.brandName.toLowerCase()) < 0 ? false : true)
      : this.brands
    this._matchBrands$.next(items);
  }

  push(item, arr) {
    if (!arr.find(it => it === item)) {
      arr.push(item);
    }
  }

  removeFilter(item, arr) {
    for (let key in this.filters) {
      if (arr === this.filters[key]) {
        this.filters[key] = arr.filter(it => it !== item);
        break ;
      }
    }
  }

  removeAll() {
    this.filters = {
      user: [],
      category: [],
      style: [],
      period: [],
      condition: [],
      material: [],
      color: [],
      designer: [],
      brand: [],
    };
    this.viewCtrl.dismiss([]);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  evaluate() {

  }

  save() {
    const filters = [];
    for (let key in this.filters) {
      this.filters[key].forEach(filter => filters.push({ type: key, name: filter.name }));
    }
    this.viewCtrl.dismiss(filters);
  }

}
