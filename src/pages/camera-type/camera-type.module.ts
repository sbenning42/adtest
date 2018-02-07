import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraTypePage } from './camera-type';

@NgModule({
  declarations: [
    CameraTypePage,
  ],
  imports: [
    IonicPageModule.forChild(CameraTypePage),
  ],
})
export class CameraTypePageModule {}
