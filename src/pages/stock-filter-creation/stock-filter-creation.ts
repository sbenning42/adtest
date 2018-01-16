import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { basePicturesApi } from '../../api/api';
import { Article } from '../../models/article';
import { PageOptions } from '../../models/page-options';
import { StockProvider } from '../../providers/stock/stock';
import { StockCountsProvider } from '../../providers/stock-counts/stock-counts';
import { StockModeProvider } from '../../providers/stock-mode/stock-mode';
import { StockDetailPage } from '../stock-detail/stock-detail';
/**
 * Generated class for the StockFilterCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-filter-creation',
  templateUrl: 'stock-filter-creation.html',
})
export class StockFilterCreationPage {

  mode$: Observable<string>;
  
    pageOptions: PageOptions;
    articles: Article[];
    selected: number;
  
    basePicturesApi = basePicturesApi;
  
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public loadingCtrl: LoadingController,
      public stockModeProvider: StockModeProvider,
      public stock: StockProvider,
      public stockCounts: StockCountsProvider
    ) {
      this.mode$ = this.stockModeProvider.get();
      this.pageOptions = new PageOptions(this.stockCounts.getCreation(), 20, 0, 'undefined');
      this.stock.get(this.pageOptions).subscribe(
        response => this.getPrincipale(this.articles = response.products),
        errors => {},
        () => this.pageOptions.nextPage()
      );
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad StockFilterCreationPage');
    }
  
    ionViewWillEnter() {
      this.selected = -1;
    }
  
    getPrincipale(articles: Article[]): Article[] {
      articles.forEach(article => {
        if (article.principale) { return ; }
        const principale = article['pictures'] ?
          article['pictures'].find(picture => +picture['principal'] === 1) :
          undefined;
      article.principale = principale ?
        basePicturesApi + principale.url_thumb :
        (article['pictures'] && article['pictures'][0] ?
          basePicturesApi + article['pictures'][0].url_thumb :
          'assets/imgs/addef.jpg');
      article.principaleB = principale ?
        basePicturesApi + principale.url_img :
        (article['pictures'] && article['pictures'][0] ?
          basePicturesApi + article['pictures'][0].url_img :
          'assets/imgs/addef.jpg');
      });
      return articles;
    }
  
    nextPage(infiniteScroll) {
      this.stock.get(this.pageOptions)
        .do(response => infiniteScroll.complete())
        .subscribe(
          response => this.articles = this.articles.concat(this.getPrincipale(response.products)),
          errors => {},
          () => this.pageOptions.nextPage()
        );
    }
  
    details(article: Article, i: number) {
      this.selected = i;
      this.navCtrl.push(StockDetailPage, {article: article, from: StockFilterCreationPage });
    }
  
    presentLoading() {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      return loading;
    }
  
    dismissLoading(loading) {
      loading.dismiss();
    }

    majArticle(articleN: Article) {
      if (this.selected < 0) { return ; }
      this.articles[this.selected] = this.getPrincipale([articleN])[0];
    }

}
