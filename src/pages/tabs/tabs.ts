import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../../providers/auth/auth';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GalleryPage } from '../gallery/gallery';
import { AddPage } from '../add/add';
import { StockPage } from '../stock/stock';
import { AccountPage } from '../account/account';
import { LoginPage } from '../login/login';
import { ACcountPage } from '../a-ccount/a-ccount';
import { CameraTabDefaultPagePage } from '../camera-tab-default-page/camera-tab-default-page';
import { CartTabDefaultPagePage } from '../cart-tab-default-page/cart-tab-default-page';
import { CloudTabDefaultPagePage } from '../cloud-tab-default-page/cloud-tab-default-page';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  /**
   * Possible page from tabs
   */
  homeRoot = HomePage;
  galleryRoot = GalleryPage;
  addRoot = AddPage;
  stockRoot = StockPage;
  accountRoot = ACcountPage;
  loginRoot = LoginPage;

  /**
   * Selected page, default 1, can be change via navParams
   */
  selectedIndex = 1;

  /**
   * Observable of the login state.
   */
  logged$: Observable<boolean>;

  constructor(
    private auth: AuthProvider, public navParams: NavParams
  ) {
    /**
     * If a custom index was given, load it.
     * Else load the gallery tab.
     */
    const index = this.navParams.get('index');
    this.selectedIndex = index ? index : 1;
    this.logged$ = this.auth.isLoggedStream();
  }
}
