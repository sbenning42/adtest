import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { basePicturesApi, baseApi } from './../../api/api';
import { User } from '../../models/user'
import { AuthProvider } from './../../providers/auth/auth';
import { ApiProvider } from './../../providers/api/api';

@Component({
  selector: 'page-a-ccount',
  templateUrl: 'a-ccount.html'
})
export class ACcountPage {

  user: User;
  account: any;
  role: string;
  roleIcon: string;
  roleColor: string;

  userSince: string;
  dateStart: string;
  dateEnd: string;

  channels: any[];

  basePictureApi = basePicturesApi;

  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider,
    private api: ApiProvider,
    public toatCtrl: ToastController
  ) {
    this.roleColor = '';
  }

  ionViewWillLoad() {
    this.api.getUser()
      .do(user => {
        this.user = user;
        if (+this.user.role_id === 1) {
          this.role = 'Admin';
          this.roleIcon = 'infinite';
          this.roleColor = '#c62828';
        } else if (+this.user.role_id === 2) {
          this.role = 'Sponsor';
          this.roleIcon = 'ribbon';
          this.roleColor = '#FFCA28';
        } else if (+this.user.role_id === 3) {
          this.role = 'Partner';
          this.roleIcon = 'medal';
          this.roleColor = '#4DD0E1';
        }
        this.userSince = user['created_at'].slice(0, 10);
      }).switchMap(() => this.api.getUserPicture())
      .do(picture => this.user['picture'] = picture)
      .switchMap(() => this.api.getUserAccount(+this.user.id))
      .do(account => {
        this.account = account;
        this.dateStart = account.start_account;
        this.dateEnd = account.end_account;
      }).switchMap(() => this.api.getChannels())
        .do(channels => this.channels = channels.filter(ch => ch.name !== 'Gallery').map(ch => {
          const mk = this.user['marketplaces'].find(mk => mk.name === ch.name);
          ch['checked'] = false;
          if (! mk) { return ch; }
          ch['checked'] = mk.status.name === 'Contracted' ? true : false;
        return ch;
      })).subscribe();
  }

  logout() {
    this.auth.logout();
  }

  stayTuned() {
    const toat = this.toatCtrl.create({
      message: 'This page is comming soon! Please come back later.',
      showCloseButton: true,
      duration: 3000
    })
    toat.present();
  }

  toasted() {
    this.stayTuned();
  }
  
}
