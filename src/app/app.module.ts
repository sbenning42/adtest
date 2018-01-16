import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/throttleTime';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { GalleryPage } from '../pages/gallery/gallery';
import { GalleryDetailPage } from '../pages/gallery-detail/gallery-detail';
import { AddPage } from '../pages/add/add';
import { StockPage } from '../pages/stock/stock';
import { StockFilterAllPage } from '../pages/stock-filter-all/stock-filter-all';
import { StockFilterCreationPage } from '../pages/stock-filter-creation/stock-filter-creation';
import { StockFilterSoldPage } from '../pages/stock-filter-sold/stock-filter-sold';
import { StockDetailPage } from '../pages/stock-detail/stock-detail';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { SliderPage } from '../pages/slider/slider';
import { ACcountPage } from '../pages/a-ccount/a-ccount';
import { CameraTabDefaultPagePage } from '../pages/camera-tab-default-page/camera-tab-default-page';
import { CartTabDefaultPagePage } from '../pages/cart-tab-default-page/cart-tab-default-page';
import { CloudTabDefaultPagePage } from '../pages/cloud-tab-default-page/cloud-tab-default-page';
import { ArticlePreviewPage } from '../pages/article-preview/article-preview';
import { NewTitleArticlePage } from '../pages/new-title-article/new-title-article';
import { NewDescriptionArticlePage } from '../pages/new-description-article/new-description-article';
import { NewPricingArticlePage } from '../pages/new-pricing-article/new-pricing-article';

import { SlidesNavigatorComponent, PicturesLoopComponent } from '../components/components.module';

import { StockProvider } from '../providers/stock/stock';
import { GalleryProvider } from '../providers/gallery/gallery';
import { AuthProvider } from '../providers/auth/auth';
import { HttpProvider } from '../providers/http/http';
import { StockModeProvider } from '../providers/stock-mode/stock-mode';
import { GalleryModeProvider } from '../providers/gallery-mode/gallery-mode';
import { AnnexesProvider } from '../providers/annexes/annexes';
import { StockCountsProvider } from '../providers/stock-counts/stock-counts';
import { ChannelsProvider } from '../providers/channels/channels';
import { ApiProvider } from '../providers/api/api';
import { UploadProvider } from '../providers/upload/upload';
import { CameraProvider } from '../providers/camera/camera';
import { StoreMyArticlesProvider } from '../providers/store-my-articles/store-my-articles';
import { ChooseChannelPage } from '../pages/choose-channel/choose-channel';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    HomePage,
    GalleryPage,
    GalleryDetailPage,
    AddPage,
    StockPage,
    StockFilterAllPage,
    StockFilterCreationPage,
    StockFilterSoldPage,
    StockDetailPage,
    AccountPage,
    LoginPage,
    LoginModalPage,
    SliderPage,
    ACcountPage,
    CameraTabDefaultPagePage,
    CartTabDefaultPagePage,
    CloudTabDefaultPagePage,
    ArticlePreviewPage,
    NewTitleArticlePage,
    NewDescriptionArticlePage,
    NewPricingArticlePage,
    ChooseChannelPage,
    SlidesNavigatorComponent, PicturesLoopComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    HomePage,
    GalleryPage,
    GalleryDetailPage,
    AddPage,
    StockPage,
    StockFilterAllPage,
    StockFilterCreationPage,
    StockFilterSoldPage,
    StockDetailPage,
    AccountPage,
    LoginPage,
    LoginModalPage,
    SliderPage,
    ACcountPage,
    CameraTabDefaultPagePage,
    CartTabDefaultPagePage,
    CloudTabDefaultPagePage,
    ArticlePreviewPage,
    NewTitleArticlePage,
    NewDescriptionArticlePage,
    NewPricingArticlePage,
    ChooseChannelPage,
    SlidesNavigatorComponent, PicturesLoopComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    StockProvider,
    GalleryProvider,
    AuthProvider,
    HttpProvider,
    StockModeProvider,
    GalleryModeProvider,
    AnnexesProvider,
    StockCountsProvider,
    ChannelsProvider,
    ApiProvider,
    UploadProvider,
    CameraProvider,
    StoreMyArticlesProvider
  ]
})
export class AppModule {}
