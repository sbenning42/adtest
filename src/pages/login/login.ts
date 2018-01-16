import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private auth: AuthProvider
  ) {
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginModalPage');
  }


  login() {
    this.auth.login(this.user).subscribe(
      response => this.navCtrl.goToRoot({}),
      error => {
        this.message = error.error.errors;
        console.log(JSON.stringify(error))
      }
    );
  }

  dismiss() {
    this.view.dismiss();
  }

}
