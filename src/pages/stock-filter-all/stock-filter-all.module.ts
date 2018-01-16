import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockFilterAllPage } from './stock-filter-all';

@NgModule({
  declarations: [
    StockFilterAllPage,
  ],
  imports: [
    IonicPageModule.forChild(StockFilterAllPage),
  ],
})
export class StockFilterAllPageModule {}
