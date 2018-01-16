import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the PicturesLoopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pictures-loop',
  templateUrl: 'pictures-loop.html'
})
export class PicturesLoopComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello PicturesLoopComponent Component');
    this.text = 'Hello World';
  }

  finish(response: boolean) {
    this.viewCtrl.dismiss(response);
  }

}
