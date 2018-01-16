import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePreviewPage } from './article-preview';

@NgModule({
  declarations: [
    ArticlePreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlePreviewPage),
  ],
})
export class ArticlePreviewPageModule {}
