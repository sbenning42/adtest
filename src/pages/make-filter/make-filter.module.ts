import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeFilterPage } from './make-filter';

@NgModule({
  declarations: [
    MakeFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeFilterPage),
  ],
})
export class MakeFilterPageModule {}
