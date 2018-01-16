import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDescriptionArticlePage } from './new-description-article';

@NgModule({
  declarations: [
    NewDescriptionArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(NewDescriptionArticlePage),
  ],
})
export class NewDescriptionArticlePageModule {}
