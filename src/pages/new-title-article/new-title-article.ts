import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Article } from '../../models/article';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the NewTitleArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-title-article',
  templateUrl: 'new-title-article.html',
})
export class NewTitleArticlePage {

  name: string;
  delegateArticle: Article;

  @ViewChild('inputToFocus') input: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, public toastCtrl: ToastController, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTitleArticlePage');
    setTimeout(() => {
      this.input.setFocus();
    },200)
    this.name = this.navParams.get('name');
    this.delegateArticle = this.navParams.get('delegate').article;
  }

  toaster(message, duration, cssClass, callback?) {
    const toast = this.toastCtrl.create({message, duration, cssClass});
    callback ? toast.onDidDismiss(callback) : undefined;
    toast.present();
  }

  save() {
    this.delegateArticle.name = this.name;
    const stream$ = this.delegateArticle.id ? this.api.putProduct(this.delegateArticle) : this.api.addProduct(<Article>{ name: this.name });
    stream$.subscribe(
      apiArticle => {
        const delegateArticle = this.navParams.get('delegate').article;
        const id = delegateArticle.id;
        delegateArticle.id = apiArticle.id;
        delegateArticle.name = apiArticle.name;
        this.navCtrl.pop();
        if (!id) { this.navParams.get('delegate').takeOne(); }
      },
      errors => {
        this.toaster(
          'Article Title must be at least 4 characters long.',
          1500, 'failure-toast');
      }
    );
  }

  cancel() {
    this.navCtrl.pop();
    this.app.getRootNav().setRoot(TabsPage, { index: 3 });
  }

}
