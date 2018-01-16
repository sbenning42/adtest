import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { basePicturesApi } from '../../api/api';
import { SliderPage } from './../../pages/slider/slider';
import { Article } from '../../models/article'; 
import { ContactPage } from '../contact/contact';
import { AnnexesProvider } from '../../providers/annexes/annexes'

/**
 * Generated class for the GalleryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery-detail',
  templateUrl: 'gallery-detail.html',
})
export class GalleryDetailPage {

  basePicturesApi = basePicturesApi;
  picturesForLoop: string[];
  morePicture: boolean;

  article: Article;

  category: string;
  period: string;
  style: string;
  condition: string;
  designer: string;
  brand: string;
  material: string;
  color: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public annexes: AnnexesProvider
  ) {
    this.article = this.navParams.get('article');
    this.picturesForLoop = [];
    if (this.article['pictures']) {
      /**
       * Forge the pictures gallery list (max 8 items)
       */
      this.article['pictures'].filter(pic => !pic.principal)
        .forEach((pic, index) => index < 7 ? this.picturesForLoop.push(basePicturesApi + pic.url_thumb) : this.morePicture = true);
    }

    /**
     * Overkill way to get article additionnal infos
     */
    const category = this.annexes.categories.find(cat => +cat.id === +this.article.category_id);
    const period = this.annexes.periods.find(cat => +cat.id === +this.article.periods_id);
    const style = this.annexes.styles.find(cat => +cat.id === +this.article.style_id);
    const condition = this.annexes.conditions.find(cat => +cat.id === +this.article.condition_id);
    const designer = this.annexes.designers.find(cat => +cat.id === +this.article.designer_id);
    const brand = this.annexes.brands.find(cat => +cat.id === +this.article.brand_id);
    const material = this.annexes.materials.find(cat => +cat.id === +this.article.material_id);
    const color = this.annexes.colors.find(col => +col.id === +this.article.color_id);
    this.category = category ? category.name : '';
    this.period = period ? period.name : '';
    this.style = style ? style.name : '';
    this.condition = condition ? condition.name : '';
    this.designer = designer ? designer.name : '';
    this.brand = brand ? brand.name : '';
    this.material = material ? material.name : '';
    this.color = color ? color.name : '';
  }

  /**
   * Push the contact page giving it the article owner
   */
  contact() {
    this.navCtrl.push(ContactPage, {user: this.article['user'], articles: this.navParams.data.articles});
  }

  /**
   * Present a modal for pictures fullscreen
   */
  detail(index: number) {
    const modal = this.modalCtrl.create(SliderPage, { pictures: this.article['pictures'], index });
    modal.present();
  }

}
