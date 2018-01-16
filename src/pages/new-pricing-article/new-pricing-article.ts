import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewPricingArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-pricing-article',
  templateUrl: 'new-pricing-article.html',
})
export class NewPricingArticlePage {

  price: number;
  quantity: number;
  price_by: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPricingArticlePage');
    this.price = this.navParams.get('price');
    this.quantity = this.navParams.get('quantity');
    this.price_by = this.navParams.get('price_by');
  }
  
  save() {
    const delegateArticle = this.navParams.get('delegate').article;
    delegateArticle.price = this.price;
    delegateArticle.quantity = this.quantity;
    delegateArticle.price_by = this.price_by;
    this.cancel();
  }

  cancel() {
    this.navCtrl.pop();
  }

}
