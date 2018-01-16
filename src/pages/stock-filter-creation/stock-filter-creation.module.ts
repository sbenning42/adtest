import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockFilterCreationPage } from './stock-filter-creation';

@NgModule({
  declarations: [
    StockFilterCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(StockFilterCreationPage),
  ],
})
export class StockFilterCreationPageModule {}
