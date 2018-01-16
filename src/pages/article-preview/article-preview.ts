import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Article } from '../../models/article';
import { Observable } from 'rxjs/Observable';
import { CameraProvider } from '../../providers/camera/camera';
import { basePicturesApi } from '../../api/api';

/**
 * Generated class for the ArticlePreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-preview',
  templateUrl: 'article-preview.html',
})
export class ArticlePreviewPage {

  article: Article = new Article();
  selected: { [key: string]: { id: string, name: string } } = {
    category: {id: '0', name: ''}, style: {id: '0', name: ''}, periods: {id: '0', name: ''},
    condition: {id: '0', name: ''}, material: {id: '0', name: ''}, color: {id: '0', name: ''},
    designer: {id: '0', name: ''}, brand: {id: '0', name: ''}, address: {id: '0', name: ''}
  };
  pictures$: Observable<string[]>;
  pictures: string[];
  basePicturesApi = basePicturesApi;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: CameraProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePreviewPage');
    this.pictures$ = this.camera.pictures$;
    this.article = this.navParams.get('article');
    this.selected = this.navParams.get('selected');
    this.pictures = this.article.pictures.map(picture => this.basePicturesApi + picture.url_thumb);
  }

  goto(x) {
    const delegate = this.navParams.get('delegate');
    delegate.gotoStep(x);
    this.navCtrl.pop();
  }

}
