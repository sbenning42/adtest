import { Component, ElementRef, ViewChild, style } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from './../../providers/api/api';
import { basePicturesApi } from './../../api/api';
import { User } from './../../models/user';
import { Article } from './../../models/article';
import { PageOptions } from './../../models/page-options';
import { GalleryProvider } from './../../providers/gallery/gallery';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('fixed') el:ElementRef;

  articles: Article[];
  contact: User;
  count = 40;
  pageOption: PageOptions;
  basePicturesApi = basePicturesApi;
  mode : boolean;
  infos: string;

  height: number;

  style = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private gallery: GalleryProvider
  ) {
    this.mode = true;
    this.pageOption = new PageOptions(0);
    this.contact = this.navParams.data.user;
  }

  ionViewDidLoad() {
    this.api.getUserInfos(+this.contact.id).do(infos => this.infos = infos.description)
      .switchMap(infos => this.gallery.get(this.pageOption, [{type: 'user', name: this.contact.name}]))
      .subscribe(
        gallery => {
          if (!gallery) { return ; }
          this.count = gallery.count;
          this.pageOption = new PageOptions(this.count);
          this.pageOption.count = gallery.count;
          this.articles = this.getPrincipale(gallery.products);
        }, () => {}, () => this.pageOption.nextPage()
      );
    setTimeout(() => {
      console.log(this.el.nativeElement);
      this.height = (<HTMLDivElement>this.el.nativeElement).clientHeight;
      this.style = {marginTop: this.height};
    }, 500);
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
    this.gallery.get(this.pageOption, [{type: 'user', name: this.contact.name}])
      .do(() => infiniteScroll.complete()).subscribe(
        gallery => {
          if (!gallery) { return ; }
          this.articles = this.articles.concat(this.getPrincipale(gallery.products));
        }, () => {}, () => this.pageOption.nextPage()
      );
  }

  dismiss() {
    this.navCtrl.pop();
  }

  toggleMode() {
    this.mode = !this.mode;
  }

  modeTrue() {
    this.mode = true;
  }

  modeFalse() {
    return ;
    // this.mode = false;
  }

}
