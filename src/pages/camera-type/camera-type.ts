import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CameraTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-type',
  templateUrl: 'camera-type.html',
})
export class CameraTypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraTypePage');
  }

  dismiss(type) {
    this.viewCtrl.dismiss(type)
  }

  camera() {
    this.dismiss(true);
  }

  pictures() {
    this.dismiss(false);
  }

}
