import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiProvider } from '../api/api';
import { Article } from '../../models/article';

/*
  Generated class for the StoreMyArticlesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class StoreMyArticlesProvider {

  static id = 0;
  static nextId(): number {
    StoreMyArticlesProvider.id += 1;
    return StoreMyArticlesProvider.id;
  }

  private action: {id: number, key: string, status: string} = {id: StoreMyArticlesProvider.id, key: '', status: ''};
  private articles: Article[] = <Article[]>[];
  private _action$: BehaviorSubject<{id: number, key: string, status: string}> = new BehaviorSubject(this.action);
  private _articles$: BehaviorSubject<Article[]> = new BehaviorSubject(this.articles);

  private  publishAction() {
    this._action$.next(this.action);
  }
  private  publishArticles() {
    this._articles$.next(this.articles);
  }

  private startAction(key: string): number {
    const id = StoreMyArticlesProvider.nextId();
    const status = 'start';
    this.action = {id, key, status};
    this.publishAction();
    return id;
  }
  private endAction() {
    const id = this.action.id;
    const key = this.action.key;
    const status = 'end';
    this.action = {id, key, status};
    this.publishAction();
  }
  private errorAction() {
    const id = this.action.id;
    const key = this.action.key;
    const status = 'error';
    this.action = {id, key, status};
    this.publishAction();
  }

  private baseObserver = {
    next: next => {},
    error: errors => {
      this.errorAction();
    },
    complete: () => {
      this.endAction();
      this.publishArticles();
    }
  };

  private readObserver = this.baseObserver;
  private createObserver = this.baseObserver;
  private updateObserver = this.baseObserver;

  private prepare(apiArticle: any): Article {
    const article = new Article(apiArticle.id,
      apiArticle.user_id, apiArticle.state_id, apiArticle.address_id,
      apiArticle.category_id, apiArticle.style_id, apiArticle.periods_id,
      apiArticle.condition_id, apiArticle.designer_id, apiArticle.brand_id,
      apiArticle.material_id, apiArticle.color_id, apiArticle.name,
      apiArticle.description, apiArticle.quantity, apiArticle.price,
      apiArticle.price_by, apiArticle.size_height, apiArticle.size_width,
      apiArticle.size_depth, apiArticle.weight, apiArticle.number_of_packs
    );
    return article;
  }

  action$: Observable<{key: string, status: string}> = this._action$.asObservable();
  articles$: Observable<Article[]> = this._articles$.asObservable();

  constructor(private api: ApiProvider) {
    this.readObserver.next = (next: {collection: any[]}) => {
      this.articles = next.collection.map(item => this.prepare(item));
    };
    this.createObserver.next = (next: any) => {
      this.articles.push(this.prepare(next));
    };
    this.updateObserver.next = (next: any) => {
      const index = this.articles.findIndex(article => +article.id === +next.id);
      this.articles[index] = this.prepare(next);
    };
  }

  private applyRead(action: { key: string, data: any }): number {
    const actionId = this.startAction(action.key);
    this.api.getStock(action.data).subscribe(this.readObserver);
    return actionId;
  }
  private applyCreate(action: { key: string, data: any }): number {
    const actionId = this.startAction(action.key);
    this.api.addProduct(action.data).subscribe(this.createObserver);
    return actionId;
  }
  private applyUpdate(action: { key: string, data: any }): number {
    const actionId = this.startAction(action.key);
    this.api.putProduct(action.data).subscribe(this.updateObserver);
    return actionId;
  }

  apply(action: { key: string, data: any }): number {
    switch (action.key) {
      case 'r': { return this.applyRead(action); }
      case 'c': { return this.applyCreate(action); }
      case 'u': { return this.applyUpdate(action); }
    }
    return -1;
  }

}
