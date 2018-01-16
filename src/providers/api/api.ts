import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User } from './../../models/user';
import { Article } from './../../models/article';
import { Channel, Status } from './../../models/channel';

import { HttpProvider } from './../http/http';

import { Api } from './../../api/api';
import { ReferenceAst } from '@angular/compiler';
import { PageOptions } from '../../models/page-options';
import { isNumber } from 'ionic-angular/util/util';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private allChannels: ColdAsyncStream;
  private annexe: ColdAsyncStream;
  private stock: HotAsyncStream;
  private gallery: HotAsyncStream;
  private channels: HotAsyncStream;

  constructor(public http: HttpProvider) {
    console.log('Hello ApiProvider Provider');

    this.allChannels = new ColdAsyncStream(this.http.get(Api.channels));
    this.annexe = new ColdAsyncStream(this.http.get(Api.annexes));
  
    this.stock = new HotAsyncStream();
    this.gallery = new HotAsyncStream();
    this.channels = new HotAsyncStream();
  }

  getAnnexe(): Observable<any[]> {
    return this.annexe.stream$;
  }

  getChannels(): Observable<Channel[]> {
    return this.allChannels.stream$;
  }

  getStock(pageOptions: PageOptions): Observable<any> {
    this.stock.fetch(this.http.post(Api.stock, {pageIndex: pageOptions.index, pageSize: pageOptions.size}));
    return this.stock.stream$;
  }

  getGallery(pageOptions: PageOptions): Observable<any> {
    this.stock.fetch(this.http.post(Api.gallery, {pageIndex: pageOptions.index, pageSize: pageOptions.size}));
    return this.gallery.stream$;
  }

  getContractedChannels(): Observable<Channel[]> {
    this.channels.fetch(this.http.get(Api.meChannels));
    return this.channels.stream$;
  }

  getUser(): Observable<any> {
    return this.http.get(Api.user);
  }

  getUserPicture(): Observable<any> {
    return this.http.get(Api.userPicture);
  }

  getUserAddresses(): Observable<any[]> {
    return this.http.get(Api.userAddresses);
  }

  getUserInfos(id: number): Observable<any> {
    return this.http.get(Api.userInfo(id));
  }

  getUserAccount(id: number): Observable<any> {
    return this.http.get(Api.userAccount(id));
  }

  addProduct(article: Article) {
    return this.http.post(Api.addArticle, {name : article.name});
  }

  putProduct(article: Article): Observable<Article> {
    return this.http.put(Api.putArticle, +article.id, article);
  }

  uploadArticlePictures(article: Article, pictures: any[]): Observable<any> {
    let stream$ = Observable.of(1);
    pictures.forEach(picture => {
      stream$ = stream$.switchMap((resp: number|any) => {
        if (!isNumber(resp)) {
          article.pictures.push(resp);
        }
        return this.uploadArticlePicture(article, picture);
      });
    });
    return stream$;
  }

  uploadArticlePicture(article: Article, picture: any): Observable<any> {
    return this.http.post(Api.uploadArticlePicture, picture);
  }

}

export class ColdAsyncStream {

  private sourceStream$: Observable<any[]>;

  private dataState: any[];
  private subjectStream$: BehaviorSubject<any[]>;
  private observableStream$: Observable<any[]>

  constructor(
    source$: Observable<any[]>,
    dataState?: any[]
  ) {
    this.initStreams(source$, dataState);
    this.fetch();
  }

  private initStreams(
    source$: Observable<any[]>,
    dataState?: any[]
  ) {
    this.dataState = dataState ? dataState : [];
    this.subjectStream$ = new BehaviorSubject(this.dataState);
    this.observableStream$ = this.subjectStream$.asObservable();
    this.sourceStream$ = source$.do(dataState => this.publish(dataState));
  }

  private next() {
    this.subjectStream$.next(this.dataState);
  }

  private publish(dataState: any[]) {
    this.dataState = dataState;
    this.next();
  }

  private fetch() {
    this.sourceStream$.subscribe();
  }

  public get stream$(): Observable<any[]> {
    return this.observableStream$;
  }

}


export class HotAsyncStream {
  
    private dataState: any[];
    private subjectStream$: BehaviorSubject<any[]>;
    private observableStream$: Observable<any[]>
  
    constructor(
      dataState?: any[]
    ) {
      this.initStreams(dataState);
    }
  
    private initStreams(
      dataState?: any
    ) {
      this.dataState = dataState ? dataState : undefined;
      this.subjectStream$ = new BehaviorSubject(this.dataState);
      this.observableStream$ = this.subjectStream$.asObservable();
    }
  
    private next() {
      this.subjectStream$.next(this.dataState);
    }
  
    private publish(dataState: any) {
      this.dataState = dataState;
      this.next();
    }
  
    public fetch(source$: Observable<any>) {
      source$.do(dataState => this.publish(dataState)).subscribe();
    }
  
    public get stream$(): Observable<any> {
      return this.observableStream$;
    }
}