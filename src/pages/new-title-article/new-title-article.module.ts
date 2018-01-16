import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTitleArticlePage } from './new-title-article';

@NgModule({
  declarations: [
    NewTitleArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(NewTitleArticlePage),
  ],
})
export class NewTitleArticlePageModule {}
