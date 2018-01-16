import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  logged$: Observable<boolean>;

  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider
  ) {
    this.logged$ = this.auth.isLoggedStream();
  }

  logout() {
    this.auth.logout();
  }

}
