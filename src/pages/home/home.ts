import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contactCallNumber: string;
  contactMailAddr: string;

  constructor(
    public navCtrl: NavController
  ) {
    this.contactCallNumber = '0662351652';
    this.contactMailAddr = 'info@authenticdesign.fr';
  }

}
