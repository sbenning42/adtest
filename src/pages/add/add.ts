import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Article } from '../../models/article';
import { ApiProvider } from '../../providers/api/api';
import { CameraProvider } from '../../providers/camera/camera';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PicturesLoopComponent } from '../../components/pictures-loop/pictures-loop';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AnnexesProvider } from '../../providers/annexes/annexes';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ArticlePreviewPage } from '../article-preview/article-preview';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { NewTitleArticlePage } from '../new-title-article/new-title-article';
import { NewDescriptionArticlePage } from '../new-description-article/new-description-article';
import { NewPricingArticlePage } from '../new-pricing-article/new-pricing-article';
import { basePicturesApi } from '../../api/api';
import { CameraTypePage } from '../camera-type/camera-type';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class ImageDataConverter {
  constructor(public dataURI) {
    this.dataURI = dataURI;
  }
  getByteString() {
    let byteString;
    if (this.dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(this.dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(this.dataURI.split(',')[1]);
    }
    return byteString;
  }
  getMimeString() {
    return this.dataURI.split(',')[0].split(':')[1].split(';')[0];
  }
  convertToTypedArray() {
    let byteString = this.getByteString();
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return ia;
  }
  dataURItoBlob() {
    let mimeString = this.getMimeString();
    let intArray = this.convertToTypedArray();
    return new Blob([intArray], {type: mimeString});
  }
}

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  @ViewChild('categoryInput', {read: ElementRef}) private categoryEl: ElementRef;
  @ViewChild('styleInput', {read: ElementRef}) private styleEl: ElementRef;
  @ViewChild('periodsInput', {read: ElementRef}) private periodsEl: ElementRef;
  @ViewChild('conditionInput', {read: ElementRef}) private conditionEl: ElementRef;
  @ViewChild('materialInput', {read: ElementRef}) private materialEl: ElementRef;
  @ViewChild('colorInput', {read: ElementRef}) private colorEl: ElementRef;
  @ViewChild('designerInput', {read: ElementRef}) private designerEl: ElementRef;
  @ViewChild('brandInput', {read: ElementRef}) private brandEl: ElementRef; 

  article: Article;
  selected = {
    category: {id: '0', name: ''}, style: {id: '0', name: ''}, periods: {id: '0', name: ''},
    condition: {id: '0', name: ''}, material: {id: '0', name: ''}, color: {id: '0', name: ''},
    designer: {id: '0', name: ''}, brand: {id: '0', name: ''}, address: {id: '0', name: ''}
  };
  pictures$: Observable<string[]>;

  addresses$: Observable<any[]>;
  errors$: Observable<string[]>;

  focus = '';
  items: {id: string, name: string}[] = [];

  private _focus$: BehaviorSubject<string> = new BehaviorSubject(this.focus);
  private _items$: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject(this.items);
  focus$: Observable<string> = this._focus$.asObservable();
  items$: Observable<{id: string, name: string}[]> = this._items$.asObservable();

  steps = [
    {icon: 'camera', color: '#f44336', isCompleted: false},
    {icon: 'book', color: '#f44336', isCompleted: false},
    {icon: 'pin', color: '#f44336', isCompleted: false},
    {icon: 'ribbon', color: '#4caf50', isCompleted: false}
  ];
  step = 0;

  sub: Subscription;
  saveSub: Subscription;
  anotherSub: Subscription;
  errSub: Subscription;
  
  basePicturesApi = basePicturesApi;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public camera: CameraProvider,
    public cam: Camera,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public api: ApiProvider,
    public annexes: AnnexesProvider,
    public platform: Platform
  ) { }

  ionViewWillEnter() {
    if (this.saveSub) { this.saveSub.unsubscribe(); }
  }

  ionViewDidLoad() {

    const article = this.navParams.get('article');
    this.article = article ? article : new Article();

    if (this.article.id) {
      this.selected.address = this.article['address'] ? this.article['address'] : {id: 0, name: ''};
      this.selected.category = this.article['category'] ? this.article['category'] : {id: 0, name: ''};
      this.selected.periods = this.article['periods'] ? this.article['periods'] : {id: 0, name: ''};
      this.selected.style = this.article['style'] ? this.article['style'] : {id: 0, name: ''};
      this.selected.material = this.article['material'] ? this.article['material'] : {id: 0, name: ''};
      this.selected.color = this.article['color'] ? this.article['color'] : {id: 0, name: ''};
      this.selected.condition = this.article['condition'] ? this.article['condition'] : {id: 0, name: ''};
      this.selected.designer = this.article['designer'] ? this.article['designer'] : {id: 0, name: ''};
      this.selected.brand = this.article['brand'] ? this.article['brand'] : {id: 0, name: ''};
    }

    this.anotherSub = Observable.interval(500).subscribe(() => {
      if (this.article.name && (this.camera.has() || (this.article.pictures && this.article.pictures.length))) {
        this.steps[0].isCompleted = true;
      } else {
        this.steps[0].isCompleted = false;
      }
      if (this.article.price && this.article.price_by && this.article.description
        && this.article.size_depth && this.article.size_height && this.article.size_width
        && this.article.weight && this.article.quantity) {
          this.steps[1].isCompleted = true;
      } else {
          this.steps[1].isCompleted = false;
      }
      if (this.article.number_of_packs && this.selected.address && this.selected.address['type']) {
        this.steps[2].isCompleted = true;
      } else {
        this.steps[2].isCompleted = false;
      }
      if (this.selected.category.name && this.selected.style.name && this.selected.periods.name
        && this.selected.condition.name && this.selected.color.name && this.selected.material.name) {
          this.steps[3].isCompleted = true;
        } else {
          this.steps[3].isCompleted = false;
        }
    });

    this.addresses$ = this.api.getUserAddresses();
    this.pictures$ = this.camera.pictures$;
    this.errors$ = this.camera.errors$;

    this.errSub = this.camera.errors$.throttleTime(1000).subscribe((err) => {
      if (!(err && err[0])) { return ; }
      this.toaster('No Picture to add', 1500, 'failure-toast');
    });
  
    this.sub = this.focus$.switchMap(focus => {
      switch (focus) {
        case 'category': { /*this.categoryEl ? this.categoryEl.nativeElement.scrollIntoView() : undefined; */this.items = this.annexes.categories; break ; }
        case 'style': { /*this.styleEl ? this.styleEl.nativeElement.scrollIntoView() : undefined; */this.items = this.annexes.styles; break ; }
        case 'periods': { /*this.periodsEl ? this.periodsEl.nativeElement.scrollIntoView() : undefined; */this.items = this.annexes.periods; break ; }
        case 'condition': { /*this.conditionEl ? this.conditionEl.nativeElement.scrollIntoView() : undefined; */this.items = this.annexes.conditions; break ; }
        case 'material': { /*this.materialEl ? this.materialEl.nativeElement.scrollIntoView() : undefined; */this.items = this.annexes.materials; break ; }
        case 'color': { /*this.colorEl ? this.colorEl.nativeElement.scrollIntoView() : undefined; */this.items = this.annexes.colors; break ; }
        case 'designer': { /*this.designerEl ? this.designerEl.nativeElement.scrollIntoView() : undefined; */this.items = this.annexes.designers; break ; }
        case 'brand': { /*this.brandEl ? this.brandEl.nativeElement.scrollIntoView() : undefined; */this.items = this.annexes.brands; break ; }
        default: {
          this.items = [];
        }
      }
      this._items$.next(this.items);
      return this.items$;
    }).subscribe();

    this.modder(NewTitleArticlePage, { delegate: this, name: this.article.name });
  
    // this.takeOne();
  }

  ionViewWillLeave() {
  }

  debugPurposeOnly() {
    //this.camera.takeOneSpecial();
  }

  takeOne() {
    this.modder(CameraTypePage, { delegate: this }, (args) => args ? this.camera.takeOne() : this.camera.takeOneL(this.platform));
    // this.camera.takeOne();
  }

  takeLoop() {
    this.camera.takeOne();
    const loop = this.modalCtrl.create(PicturesLoopComponent);
    loop.onDidDismiss(finish => finish ? undefined : this.takeLoop())
    loop.present();
  }

  remove(index: number) {
    this.camera.removePicture(index);
  }

  removeError(index: number) {
    this.camera.removeError(index);
  }

  stepUp() {
    this.step = (this.step + 1) % 4;
  }

  stepDown() {
    const step = (this.step - 1) % 4;
    this.step = step < 0 ? 0 : step;
  }

  gotoStep($event) {
    this.step = $event;
  }

  preview() {
    this.navCtrl.push(ArticlePreviewPage, {
      article: this.article,
      selected: this.selected,
      camera: this.camera,
      delegate: this
    });
  }

  toaster(message, duration, cssClass, callback?) {
    const toast = this.toastCtrl.create({message, duration, cssClass});
    callback ? toast.onDidDismiss(callback) : undefined;
    toast.present();
  }

  aggregateArticleAndSelection() {
    this.article.address_id = this.selected.address.id;
    this.article.brand_id = this.selected.brand.id;
    this.article.category_id = this.selected.category.id;
    this.article.color_id = this.selected.color.id;
    this.article.condition_id = this.selected.condition.id;
    this.article.designer_id = this.selected.designer.id;
    this.article.periods_id = this.selected.periods.id;
    this.article.material_id = this.selected.material.id;
    this.article.style_id = this.selected.style.id;
  }

  convertBase64Encoding(dataURL) {
    const blob = new ImageDataConverter(dataURL).dataURItoBlob();
    let data = new FormData();
    data.append('file_name', 'file');
    data.append('file', blob);
    data.append('fileName', 'unknow');
    data.append('fileSize', 'unknow');
    data.append('fileType', 'unknow');
    data.append('fileLastMod', 'unknow');
    return data;
  }

  saveDraft(observer?) {
    if (this.saveSub) { this.saveSub.unsubscribe(); }
    let successDraftMsg, errorDraftMsg;
    if (this.article.id) {
      successDraftMsg = 'Product draft was edited successfully';
      errorDraftMsg = 'Product draft was not edited';
    } else {
      successDraftMsg = 'Product was created successfully';
      errorDraftMsg = 'Product was not created. Title is missing'; 
    }
    this.aggregateArticleAndSelection();
    let picturesFiles = this.camera.deploy()
      .map(picture => this.convertBase64Encoding(picture));
    let creationStream$;
    if (!this.article.id) {
      creationStream$ = this.api.addProduct(this.article)
        .do(apiArticle => this.article.id = apiArticle.id)
        .do(apiArticle => picturesFiles.forEach(pictureFile => pictureFile.append('article_id', apiArticle.id)));
    } else {
      picturesFiles.forEach(pictureFile => pictureFile.append('article_id', this.article.id));
    }
    let picturesStreams$;
    picturesFiles.forEach((file, index) => {
      picturesStreams$ = picturesStreams$
        ? picturesStreams$.switchMap(() => this.api.uploadArticlePicture(this.article, file)
          .do(resp => this.article.pictures.push(resp.img))
          .do(() => this.toaster('Picture Saved !', 1500, 'success-toast')))
        : this.api.uploadArticlePicture(this.article, file)
          .do(resp => this.article.pictures.push(resp.img))
          .do(() => this.toaster('Picture Saved !', 1500, 'success-toast'));
    });

    let stream$ = creationStream$ && picturesStreams$
      ? creationStream$.switchMap(() => picturesStreams$).switchMap(() => this.api.putProduct(this.article))
      : creationStream$
        ? creationStream$.switchMap(() => this.api.putProduct(this.article))
        : picturesStreams$
          ? picturesStreams$.switchMap(() => this.api.putProduct(this.article))
          : this.api.putProduct(this.article);
    
    let loading;
    if (!observer) {
      loading = this.loading.create();
      loading.present();
    }
    this.saveSub = stream$.subscribe(observer ? observer : {
      next: () => {
        this.toaster(successDraftMsg, 1500, 'success-toast');
        loading.dismiss();
      },
      error: () => {
        this.toaster(errorDraftMsg, 1500, 'failure-toast');
        loading.dismiss();
      }
    });

  }

  save() {
    let successMsg, errorMsg;
    if (this.article.id) {
      successMsg = 'Product was edited successfully';
      errorMsg = 'Product was not edited';
    } else {
      successMsg = 'Product was created successfully';
      errorMsg = 'Product was not created. Title is missing';   
    }
    const loading = this.loading.create();
    const observer = {
      next: (data) => {
        this.toaster(successMsg, 1500, 'success-toast');
        loading.dismiss();
        this.app.getRootNav().setRoot(TabsPage, { index: 3 });
      },
      error: (err) => {
        this.toaster(errorMsg, 1500, 'failure-toast');
        loading.dismiss();
      }
    };
    loading.present();
    this.saveDraft(observer);
  }

  setFocus(key: string) {
    this.focus = key;
    this._focus$.next(key);
  }

  getItems(search: any) {
    const items = this.items.filter(item => item.name.toLowerCase().search(search.name.toLowerCase()) < 0 ? false : true);
    this._items$.next(items);
  }

  toggleAutocomp() {
    if (this.focus && this.items && this.items[0]) {
      this._focus$.next('');
    } else {
      this._focus$.next(this.focus);
    }
  }

  modder(page, data?, callback?) {
    const modal = this.modalCtrl.create(page, data);
    if (callback) {
      modal.onDidDismiss(callback);
    }
    modal.present();
    return modal;
  }

  openTitle() {
    this.modder(NewTitleArticlePage, { delegate: this, name: this.article.name, from: 'here' });
  }

  openDescription() {
    this.modder(NewDescriptionArticlePage, { delegate: this, description: this.article.description });
  }

  openPricing() {
    this.modder(NewPricingArticlePage, {
      delegate: this,
      price: this.article.price,
      quantity: this.article.quantity,
      price_by: this.article.price_by
    });
  }

}
