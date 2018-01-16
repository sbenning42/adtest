import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { basePicturesApi } from './../../api/api';

/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

  pictures: string[];
  index: number;

  mySlideOptions= {
    initialSlide:0,
    pager:true,
    spaceBetween:0
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.pictures = this.navParams.get('pictures').map(pic => basePicturesApi + pic.url_img);
    this.index = this.navParams.get('index');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
