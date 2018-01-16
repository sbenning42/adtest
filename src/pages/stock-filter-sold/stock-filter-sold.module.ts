import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockFilterSoldPage } from './stock-filter-sold';

@NgModule({
  declarations: [
    StockFilterSoldPage,
  ],
  imports: [
    IonicPageModule.forChild(StockFilterSoldPage),
  ],
})
export class StockFilterSoldPageModule {}
