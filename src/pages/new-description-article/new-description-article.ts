import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewDescriptionArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-description-article',
  templateUrl: 'new-description-article.html',
})
export class NewDescriptionArticlePage {

  description: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDescriptionArticlePage');
    this.description = this.navParams.get('description');
  }

  save() {
    const delegateArticle = this.navParams.get('delegate').article;
    delegateArticle.description = this.description;
    this.cancel();
  }

  cancel() {
    this.navCtrl.pop();
  }

}
