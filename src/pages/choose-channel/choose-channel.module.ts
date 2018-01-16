import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseChannelPage } from './choose-channel';

@NgModule({
  declarations: [
    ChooseChannelPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseChannelPage),
  ],
})
export class ChooseChannelPageModule {}
