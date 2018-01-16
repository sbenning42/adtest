import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPricingArticlePage } from './new-pricing-article';

@NgModule({
  declarations: [
    NewPricingArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(NewPricingArticlePage),
  ],
})
export class NewPricingArticlePageModule {}
